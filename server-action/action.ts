interface datacars {
  id: string;
  urls: { regular: string };
}

const key = process.env.UNSPLASH_ACCESS_KEY;

export async function GetData(): Promise<datacars[]> {
  const response = await fetch(`https://api.unsplash.com/photos`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${key}`,
    },
    next: { revalidate: 500 },
  });
  const data = await response.json();

  return data;
}

export async function GetCarByType(type: string): Promise<datacars[]> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${type}&per_page=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${key}`,
      },
      next: { revalidate: 500 },
    },
  );
  const data = await response.json();

  return data;
}
