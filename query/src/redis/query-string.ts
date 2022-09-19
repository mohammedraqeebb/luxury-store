import { searchFieldToBeIncluded } from './search-field';

export const getQueryString = (
  field: string,
  tags: string[],
  cleanedSearchField: string = ''
): string => {
  if (searchFieldToBeIncluded(field, cleanedSearchField)) {
    if (field === 'gender' && cleanedSearchField === 'men') {
      cleanedSearchField = 'male';
    } else if (field === 'gender' && cleanedSearchField === 'women') {
      cleanedSearchField = 'female';
    }
    tags.push(cleanedSearchField);
    const tagsSet = new Set(tags);
    tags = Array.from(tagsSet);
  }

  let queryString = '';

  for (let i = 0; i < tags.length; i++) {
    if (i === 0 && tags.length === 1) {
      queryString = `@${field}:{${tags[0]}}`;
    } else if (i === 0) {
      queryString = `@${field}:{${tags[0]}`;
    } else if (i == tags.length - 1) {
      queryString = `${queryString} | ${tags[i]}}`;
    } else {
      queryString = `${queryString} | ${tags[i]}`;
    }
  }
  return queryString;
};
