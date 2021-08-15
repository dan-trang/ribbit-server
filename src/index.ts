import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from "connect-redis"
import { MyContext } from "./types";


const main = async () => {
    //this is database connection
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express();

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use(
        session({
            name: "qid",
            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1-year expiration
                httpOnly: true,
                sameSite: 'lax',  // protect crf
                secure: __prod__, // cookies will only work in https
            },
            saveUninitialized: false,
            secret: "95yGZ3x24pR71mL",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }), 
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res}),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    //testing endpoint 
    // app.get('/', (_, res) => {
    //     res.send("hallo, test...test...");
    // });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});

