const NO_CORS_URL = 'https://api.allorigins.win';

/**
 * Fetch data from external API
 *
 * @param {string} fetchUrl - url to fetch data
 * @returns object | array - the response data from the fetch
 */
export async function fetchData(fetchUrl) {
  const encodedFetchUrl = encodeURIComponent(fetchUrl);

  const response = await fetch(`${NO_CORS_URL}/get?url=${encodedFetchUrl}`);

  if (!response.ok) {
    throw new Error(`${fetchUrl} response was not successful`);
  }

  const data = await response.json();

  return JSON.parse(data.contents);
}
