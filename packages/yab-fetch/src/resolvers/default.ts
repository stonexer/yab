export function defaultJSONResolver(response: Response) {
  return response.json();
}

export function defaultTextResolver(response: Response) {
  return response.text();
}

export function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}
