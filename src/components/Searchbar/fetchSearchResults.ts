interface ResortName {
  name: string;
}

interface SearchResult {
  data: {
    resorts: ResortName[];
  };
}

const mockDataH: SearchResult = {
  data: {
    resorts: [
      { name: 'Hafjell' },
      { name: 'Hemavan' },
      { name: 'Hemsedal' },
      { name: 'Hintertux' },
      { name: 'Hovden' },
    ],
  }
}

const mockDataHa: SearchResult = {
  data: {
    resorts: [
      { name: 'Hafjell' },
    ],
  }
}

const mockDataHe: SearchResult = {
  data: {
    resorts: [
      { name: 'Hemavan' },
      { name: 'Hemsedal' },
    ],
  }
}
const mockData: SearchResult = {
  data: {
    resorts: [
      // No resorts found
    ],
  }
}

export default async function fetchSearchResults(searchValue: string): Promise<SearchResult> {
  // const response = await fetch(`https://api.example.com/search?q=${searchValue}`);
  // const data = await response.json();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(250); // Add a 1-second delay

  if (searchValue.toLowerCase() === "h") {
    return mockDataH
  }
  else if (searchValue.toLowerCase() === "ha") {
    return mockDataHa
  }
  else if (searchValue.toLowerCase() === "he") {
    return mockDataHe
  }
  else {
    return mockData
  }
}