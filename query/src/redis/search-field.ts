export const searchFieldToBeIncluded = (field: string, searchField: string) => {
  if (
    field === 'gender' &&
    (searchField === 'male' ||
      searchField === 'female' ||
      searchField === 'men' ||
      searchField === 'women')
  ) {
    return true;
  }
  if (
    field === 'category' &&
    (searchField === 'watch' ||
      searchField === 'shades' ||
      searchField === 'shoes' ||
      searchField === 'belt' ||
      searchField === 'handbag')
  ) {
    return true;
  }
  if (
    field === 'brand' &&
    (searchField === 'hublot' ||
      searchField === 'givenchi' ||
      searchField === 'balmain' ||
      searchField === 'rolex' ||
      searchField === 'gucci' ||
      searchField === 'watch')
  )
    return true;
};
