import { Client } from '@retracedhq/retraced';
import type { CRUD, Event } from '@retracedhq/retraced';
import type { User } from 'next-auth';

import type { AuditLogsEventType } from '../types/audit-logs';

type Request = {
  action: AuditLogsEventType;
  user: User;
  crud: CRUD;
  // target: Target;
};
const RETRACED_API_KEY = process.env.RETRACED_API_KEY ?? '';
const RETRACED_PROJECT_ID = process.env.RETRACED_PROJECT_ID ?? '';
const RETRACED_URL = process.env.RETRACED_URL ?? '';

let retracedClient: Client;

const getRetracedClient = () => {
  if (!RETRACED_API_KEY || !RETRACED_PROJECT_ID || !RETRACED_URL) {
    return;
  }

  if (!retracedClient) {
    retracedClient = new Client({
      endpoint: RETRACED_URL,
      apiKey: RETRACED_API_KEY,
      projectId: RETRACED_PROJECT_ID,
    });
  }

  return retracedClient;
};

export const sendAudit = async (request: Request) => {
  const retracedClient = getRetracedClient();

  if (!retracedClient) {
    return;
  }

  const { action, user, crud } = request;

  const event: Event = {
    action,
    crud,
    group: {
      id: user.id.toString(),
      name: user.name!,
    },
    actor: {
      id: user.id.toString(),
      name: user.name as string,
    },
    created: new Date(),
  };

  return await retracedClient.reportEvent(event);
};

export const getViewerToken = async (groupId: string, actorId: string) => {
  const retracedClient = getRetracedClient();

  if (!retracedClient) {
    return;
  }

  try {
    return await retracedClient.getViewerToken(groupId, actorId, true);
  } catch (_error) {
    throw new Error(
      'Unable to get viewer token from Retraced. Please check Retraced configuration.',
    );
  }
};
