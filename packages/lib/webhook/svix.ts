import { EndpointIn, Svix } from 'svix';

import { AppEvent } from '../types/webhook.type';

let svixClient: Svix;

const createSvixInstance = () => {
  if (!svixClient) {
    svixClient = new Svix(process.env.SVIX_API_KEY);
  } else {
    return svixClient;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
const withSvixApiKey = async (callback: (svix: any) => Promise<any>) => {
  if (!process.env.SVIX_API_KEY) {
    throw new Error('SVIX_API_KEY is not defined');
  }
  const svix = createSvixInstance();
  return callback(svix);
};

export const findOrCreateApp = async (name: string, uid: string) => {
  return withSvixApiKey((svix) => {
    return svix.application.getOrCreate({ name, uid });
  });
};

export const createWebhook = async (appId: string, data: EndpointIn) => {
  return withSvixApiKey((svix) => {
    return svix.endpoint.create(appId, data);
  });
};

export const updateWebhook = async (appId: string, endpointId: string, data: EndpointIn) => {
  return withSvixApiKey((svix) => {
    return svix.endpoint.update(appId, endpointId, data);
  });
};

export const findWebhook = async (appId: string, endpointId: string) => {
  return withSvixApiKey((svix) => {
    return svix.endpoint.get(appId, endpointId);
  });
};

export const listWebhooks = async (appId: string) => {
  return withSvixApiKey((svix) => {
    return svix.endpoint.list(appId);
  });
};

export const deleteWebhook = async (appId: string, endpointId: string) => {
  return withSvixApiKey((svix) => {
    return svix.endpoint.delete(appId, endpointId);
  });
};

export const sendEvent = async (
  appId: string | undefined,
  eventType: AppEvent,
  payload: Record<string, unknown>,
) => {
  return withSvixApiKey((svix) => {
    return svix.message.create(appId ? appId : 'notario', {
      eventType,
      payload: {
        event: eventType,
        data: payload,
      },
    });
  });
};
