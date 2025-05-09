import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const getProductByKey = async (key: string): Promise<ProductProjection> => {
  const response = await apiRoot.productProjections().withKey({ key }).get().execute();

  return response.body;
};

export default getProductByKey;
