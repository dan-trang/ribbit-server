import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "beep boop, i'm not a robot"
    }
}