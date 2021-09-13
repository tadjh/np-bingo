import { NODE_ENV } from '../config';

/**
 * Search if element exists in the array
 * @param search Element to be queried
 * @param set Array of search set
 * @returns True or false depending on match
 */
export function findElementInArray<T>(search: T, set: T[]): boolean {
  return set.some((element) => search === element);
}

/**
 * Search for element in array and return its index
 * @param search Element to be queried
 * @param set Array of search set
 * @returns Index position of first found element or -1
 */
export function findElementIndex<T>(search: T, set: T[]): number {
  return set.findIndex((element) => search === element);
}

/**
 * Takes an array and returns a random element.
 * @param array
 */
export function randomElement<T>(array: T[]) {
  return array[randomIndex(array)];
}

/**
 * Takes an array and returns a random index position
 * @param array Any array
 */
export function randomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}

/**
 * Takes a range and returns a random value from 0 to the specified range
 * @param range Number
 * @returns
 */
export function randomNumber(range: number): number {
  return Math.floor(Math.random() * range + 1);
}

/**
 * Error handler function
 * @param error
 */
export function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger(error.response.data);
    logger(error.response.status);
    logger(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    logger(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    logger('Error', error.message);
  }
  logger(error.config);
}

/**
 * Turns input text into slug
 * @param text
 * @returns slug
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * Console log (Development Only)
 * @param message string
 */
export function logger(message?: any, ...optionalParams: any[]): void {
  if (NODE_ENV !== 'development') return;
  console.log(message, ...optionalParams);
}

/**
 * Generate four random digits as a string
 * @returns
 */
export function fourRandomDigits(): string {
  const randomDigits = randomNumber(9999) + '';
  return ('0000' + randomDigits).substring(randomDigits.length);
}
