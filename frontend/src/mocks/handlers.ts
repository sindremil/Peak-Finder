import { graphql, HttpResponse } from "msw";
import { hemsedalPage, hemsedalAfterRating } from "./mockData";

const handlers = [
  graphql.query("GetDestination", () => HttpResponse.json(hemsedalPage)),
  graphql.mutation("giveRating", () => HttpResponse.json(hemsedalAfterRating)),
];

export default handlers;
