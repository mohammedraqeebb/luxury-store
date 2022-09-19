export const getFinalQueryString = (queryStrings: string[]): string => {
  let finalQueryString = '';
  queryStrings = queryStrings.filter((queryString) => queryString !== '');
  for (let i = 0; i < queryStrings.length; i++) {
    if (i === 0 && queryStrings.length === 1) {
      finalQueryString = queryStrings[i];
    } else if (i === 0) {
      finalQueryString = queryStrings[i];
    } else {
      finalQueryString = `${finalQueryString} && ${queryStrings[i]}`;
    }
  }
  return finalQueryString;
};
