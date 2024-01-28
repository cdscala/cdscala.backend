import mongo from "../config/db/db.mongo.js";
import config from "../config/server.config.js";

export let Product
export let Cart
export let Category
export let User
export let Ticket

switch (config.persistence) {
    case "MONGO":
        mongo()

        const { default: ProductsMongo } = await import(
            "./mongodb/product.mongodb.js"
        );
        Product = ProductsMongo;
        const { default: CartMongo } = await import(
            "./mongodb/cart.mongodb.js"
        );
        Cart = CartMongo;
        const { default: CategoryMongo } = await import(
            "./mongodb/category.mongodb.js"
        );
        Category = CategoryMongo;
        const { default: UserMongo } = await import(
            "./mongodb/user.mongodb.js"
        );
        User = UserMongo;
        const { default: TicketMongo } = await import(
            "./mongodb/ticket.mongodb.js"
        );
        Ticket = TicketMongo;
        break;

    case "MEMORY":
        // const { default: *Memory } = await import(
        //   "./memory/*.memory.js"
        // );
        // * = *Memory;
        break;
}