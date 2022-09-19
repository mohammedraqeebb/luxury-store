export const deserialize = (id: string, product: { [key: string]: string }) => {
  if (product['$']) {
    const parsedFields = JSON.parse(product['$']);
    return {
      id: id.split('#')[1],
      name: parsedFields.name,
      description: parsedFields.description,
      images: parsedFields.images,
      category: parsedFields.category,
      brand: parsedFields.brand,
      status: parsedFields.status,
      price: product.price,
      originalPrice: parsedFields.originalPrice,
    };
  }
  return {
    id: id.split('#')[1],
    name: product.name,
    description: product.description,
    images: product.images,
    category: product.category,
    brand: product.brand,
    status: product.status,
    price: parseFloat(product.price),
    originalPrice: parseFloat(product.originalPrice),
  };
};
