export interface ResortName {
  name: string;
}

export interface SearchResult {
  data: {
    resorts: ResortName[];
  };
}
