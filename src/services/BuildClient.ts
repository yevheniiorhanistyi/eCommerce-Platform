import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const getEnvVar = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
};

const projectKey = getEnvVar(process.env.NEXT_PUBLIC_PROJECT_KEY, 'NEXT_PUBLIC_PROJECT_KEY');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: getEnvVar(process.env.NEXT_PUBLIC_AUTH_URL, 'NEXT_PUBLIC_AUTH_URL'),
  projectKey,
  credentials: {
    clientId: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_ID, 'NEXT_PUBLIC_CLIENT_ID'),
    clientSecret: getEnvVar(process.env.NEXT_PUBLIC_CLIENT_SECRET, 'NEXT_PUBLIC_CLIENT_SECRET')
  },
  scopes: [getEnvVar(process.env.NEXT_PUBLIC_SCOPES, 'NEXT_PUBLIC_SCOPES')],
  fetch
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: getEnvVar(process.env.NEXT_PUBLIC_API_URL, 'NEXT_PUBLIC_API_URL'),
  fetch
};

const client: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
