import { EndpointIn, Svix } from 'svix';

/// FIXME
const svix = new Svix('apiKey');

export const findOrCreateApp = async (name: string, uid: string, apiKey: string) => {
  if (!apiKey) {
    return;
  }

  return await svix.application.getOrCreate({ name, uid });
};

export const createWebhook = async (appId: string, data: EndpointIn, apiKey: string) => {
  if (!apiKey) {
    return;
  }

  return await svix.endpoint.create(appId, data);
};

export const updateWebhook = async (
  appId: string,
  endpointId: string,
  data: EndpointIn,
  apiKey: string,
) => {
  if (!apiKey) {
    return;
  }

  return await svix.endpoint.update(appId, endpointId, data);
};

export const findWebhook = async (appId: string, endpointId: string, apiKey: string) => {
  if (!apiKey) {
    return;
  }

  return await svix.endpoint.get(appId, endpointId);
};

export const listWebhooks = async (appId: string, apiKey: string) => {
  if (!apiKey) {
    return;
  }

  return await svix.endpoint.list(appId);
};

export const deleteWebhook = async (appId: string, endpointId: string, apiKey: string) => {
  if (!apiKey) {
    return;
  }

  return await svix.endpoint.delete(appId, endpointId);
};

export const sendEvent = async (appId: string, eventType: string, payload: any, apiKey: string) => {
  if (!apiKey) {
    return;
  }

  return await svix.message.create(appId, {
    eventType: eventType,
    payload: {
      event: eventType,
      data: payload,
    },
  });
};
