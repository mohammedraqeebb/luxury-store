import { client } from './redis-client';
import { productsIndexKey } from './keys';
import { deserialize } from './deserialize';
import { getQueryString } from './query-string';
import { isQueryEmpty } from './query-fields';
export interface Query {
  gender: string[];
  category: string[];
  brand: string[];
  price: string[];
  sortOrder: string;
}
import { getFinalQueryString } from './final-query-string';

export const searchItems = async (
  searchField: string,
  queryFields: Query,
  pageNumber: number = 1,
  size: number = 20
) => {
  if (isQueryEmpty(queryFields) && searchField.length <= 1) {
    let results = await client.ft.search(productsIndexKey(), '*', {
      SORTBY: {
        BY: 'price',
        DIRECTION: queryFields.sortOrder,
      },
      LIMIT: {
        from: 0,
        size,
      },
    } as any);
    // console.log('results', results);
    // const stringiFiedResults = JSON.stringify(results);
    // console.log('stringiFiedResults', stringiFiedResults);
    // console.log('parsedResults', JSON.parse(stringiFiedResults));

    return results.documents.map(({ id, value }) =>
      deserialize(id, value as any)
    );
  }

  let cleanedSearchField = searchField
    .replaceAll(/[^a-zA-z0-9 ]/g, '')
    .toLowerCase()
    .trim()
    .split(' ')
    .map((word) => (word ? `${word}` : ''))
    .join(' ');

  if (isQueryEmpty(queryFields) && cleanedSearchField === '') return [];
  const { gender, category, brand, price, sortOrder } = queryFields;
  console.log(sortOrder, 'sororder');
  const genderQueryString = getQueryString(
    'gender',
    gender,
    cleanedSearchField
  );
  console.log('genderfield', genderQueryString);

  const categoryQueryString = getQueryString(
    'category',
    category,
    cleanedSearchField
  );
  console.log(categoryQueryString);
  let priceQueryString = '';
  if (price.length > 0) {
    priceQueryString = `@price:[${price}]`;
  }
  let searchQueryString = '';
  if (cleanedSearchField.length >= 2) {
    searchQueryString = `@name:(${cleanedSearchField}*)`;
  }

  const brandQueryString = getQueryString('brand', brand, cleanedSearchField);
  console.log(brandQueryString);
  let finalQueryString = getFinalQueryString([
    genderQueryString,
    categoryQueryString,
    priceQueryString,
    brandQueryString,
    searchQueryString,
  ]);

  if (finalQueryString === '') {
    finalQueryString = '*';
  }

  const results = await client.ft.search(productsIndexKey(), finalQueryString, {
    SORTBY: {
      BY: 'price',
      DIRECTION: sortOrder,
    },
    LIMIT: {
      from: 0,
      size,
    },
  } as any);
  // console.log('results', results);

  return results.documents.map(({ id, value }) =>
    deserialize(id, value as any)
  );
};
