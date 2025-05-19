import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { getEnvVar } from '@/lib/utils';
import {
  httpMiddlewareOptions,
  getRefreshAuthMiddlewareOptions
} from '@/services/commercetools/options/options';
import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder
} from '@commercetools/platform-sdk';

const projectKey = getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, 'NEXT_PUBLIC_PROJECT_KEY');

export const createRefreshTokenClient = (refreshToken: string): ByProjectKeyRequestBuilder => {
  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(getRefreshAuthMiddlewareOptions(refreshToken))
    .withHttpMiddleware(httpMiddlewareOptions())
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
