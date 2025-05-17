import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { getEnvVar } from '@/lib/utils';
import {
  httpMiddlewareOptions,
  getAuthMiddlewareOptions
} from '@/services/commercetools/options/options';

const projectKey = getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, 'NEXT_PUBLIC_PROJECT_KEY');

export const createCredentialsClient = (): ByProjectKeyRequestBuilder => {
  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(getAuthMiddlewareOptions())
    .withHttpMiddleware(httpMiddlewareOptions())
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
