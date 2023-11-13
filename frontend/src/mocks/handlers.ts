import { graphql, HttpResponse } from 'msw';
import { hemsedal } from './mockData';


export const handlers = [
  graphql.query('GetDestination', ({ variables }) => {
    const { Resort } = variables;

    return HttpResponse.json(hemsedal);
  })
];
