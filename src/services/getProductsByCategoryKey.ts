import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';
import { getAllCategories } from './getAllCategories';

export const getProductsByCategoryKey = async (key: string): Promise<ProductProjection[]> => {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.key === key);

  if (!category) throw new Error(`Category with key "${key}" not found`);

  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`categories.id:"${category.id}"`],
        limit: 10
      }
    })
    .execute();

  return response.body.results;
};

export default getProductsByCategoryKey;
