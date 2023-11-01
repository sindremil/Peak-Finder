import { SearchResult } from "./searchbarTypes";

const mockDataH: SearchResult = {
  data: {
    resorts: [
      { name: "Hafjell" },
      { name: "Hemavan" },
      { name: "Hemsedal" },
      { name: "Hintertux" },
      { name: "Hovden" },
    ],
  },
};

const mockDataHa: SearchResult = {
  data: {
    resorts: [{ name: "Hafjell" }],
  },
};

const mockDataHe: SearchResult = {
  data: {
    resorts: [{ name: "Hemavan" }, { name: "Hemsedal" }],
  },
};
const mockData: SearchResult = {
  data: {
    resorts: [
      // No resorts found
    ],
  },
};

// This is mocked for now until the backend is up and running
export default async function fetchSearchResults(
  searchValue: string,
): Promise<SearchResult> {
  // const response = await fetch(`https://api.example.com/search?q=${searchValue}`);
  // const data = await response.json();

  if (searchValue.toLowerCase() === "h") {
    return mockDataH;
  }
  if (searchValue.toLowerCase() === "ha") {
    return mockDataHa;
  }
  if (searchValue.toLowerCase() === "he") {
    return mockDataHe;
  }
  return mockData;
}
