import { EndpointIn, Svix } from 'svix';

import { AppEvent } from '../types/webhook.type';

/// FIXME
const svix = new Svix(process.env.SVIX_API_KEY);

export const findOrCreateApp = async (name: string, uid: string) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.application.getOrCreate({ name, uid });
};

export const createWebhook = async (appId: string, data: EndpointIn) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.endpoint.create(appId, data);
};

export const updateWebhook = async (appId: string, endpointId: string, data: EndpointIn) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.endpoint.update(appId, endpointId, data);
};

export const findWebhook = async (appId: string, endpointId: string) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.endpoint.get(appId, endpointId);
};

export const listWebhooks = async (appId: string) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.endpoint.list(appId);
};

export const deleteWebhook = async (appId: string, endpointId: string) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.endpoint.delete(appId, endpointId);
};

export const sendEvent = async (
  appId: string | undefined,
  eventType: AppEvent,
  payload: Record<string, unknown>,
) => {
  if (!process.env.SVIX_API_KEY) {
    return;
  }

  return await svix.message.create(appId ? appId : 'notario', {
    eventType,
    payload: {
      event: eventType,
      data: payload,
    },
  });
};
