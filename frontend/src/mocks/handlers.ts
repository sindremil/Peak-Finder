import { graphql, HttpResponse } from "msw";
import { hemsedalPage } from "./mockData";

const handlers = [
  graphql.query("GetDestination", () => HttpResponse.json(hemsedalPage)),
];

export default handlers;
