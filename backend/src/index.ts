import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import connectDatabase from "./database/database";
import cors from "cors";
import config from "./config";
import graphQlSchema from "./graphQL/schema/index";
import graphQlResolver from "./graphQL/resolvers/index";
import isAuth from "./middleware/is-Auth";
const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
connectDatabase();
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
  })
);

const PORT = config.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server runnning on port ${PORT}`);
});
