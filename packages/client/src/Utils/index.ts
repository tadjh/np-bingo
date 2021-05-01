/**
 * Search if number exists in the array
 * @param search Number to be queried
 * @param set Array of search set
 * @returns True or false depending on match
 */
export function findElementInArray(search: number, set: number[]): boolean {
  return set.some((element) => search === element);
}

/**
 * Takes an array and returns a random element.
 * @param array
 */
export function randomElement(array: any[]) {
  return array[randomIndex(array)];
}

/**
 * Takes an array and returns a random index position
 * @param array Any array
 */
export function randomIndex(array: any[]) {
  return Math.floor(Math.random() * array.length);
}

export function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}
