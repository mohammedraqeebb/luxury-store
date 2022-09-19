import { Query } from './search';
export const isQueryEmpty = (query: Query) => {
  if (!query) {
    return true;
  }
  if (
    JSON.stringify(query) ===
    JSON.stringify({
      gender: [],
      category: [],
      brand: [],
      price: 0,
      sortOrder: 'ASC',
    })
  ) {
    return true;
  }
  if (
    JSON.stringify(query) ===
    JSON.stringify({
      gender: [],
      category: [],
      brand: [],
      price: 0,
      sortOrder: 'DESC',
    })
  ) {
    return true;
  }

  return false;
};
