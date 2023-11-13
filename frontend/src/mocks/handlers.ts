import { graphql, HttpResponse } from "msw";
import hemsedal from "./mockData";

const handlers = [
  graphql.query("GetDestination", () => HttpResponse.json(hemsedal)),
];

export default handlers;
