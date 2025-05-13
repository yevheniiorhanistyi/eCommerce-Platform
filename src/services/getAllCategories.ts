import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiRoot.categories().get().execute();

  return response.body.results;
};

export default getAllCategories;
