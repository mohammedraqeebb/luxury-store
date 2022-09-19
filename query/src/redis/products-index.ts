import { SchemaFieldTypes } from 'redis';
import { client } from './redis-client';
import { productsIndexKey, productsKey } from './keys';

export const createProductsIndex = async () => {
  const indexes = await client.ft._list();
  const exists = indexes.find((index) => index === productsIndexKey());

  if (exists) {
    return;
  }

  return client.ft.create(
    productsIndexKey(),
    {
      '$.name': {
        type: SchemaFieldTypes.TEXT,
        SORTABLE: true,
        AS: 'name',
      },
      '$.description': {
        type: SchemaFieldTypes.TEXT,
        SORTABLE: false,
        AS: 'description',
      },
      '$.gender': {
        type: SchemaFieldTypes.TAG,
        SORTABLE: false,
        AS: 'gender',
      },
      '$.brand': {
        type: SchemaFieldTypes.TAG,
        SORTABLE: false,
        AS: 'brand',
      },
      '$.price': {
        type: SchemaFieldTypes.NUMERIC,
        SORTABLE: true,
        AS: 'price',
      },
      '$.category': {
        type: SchemaFieldTypes.TAG,
        SORTABLE: false,
        AS: 'category',
      },
      '$.userId': {
        type: SchemaFieldTypes.TAG,
        SORTABLE: false,
        AS: 'userId',
      },
      // ' $.images': {
      //   type: SchemaFieldTypes.TAG,

      //   AS: 'images',
      // },
    } as any,
    {
      ON: 'JSON',
      PREFIX: productsKey(''),
    }
  );
};
