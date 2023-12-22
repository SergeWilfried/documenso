'use server';

import type { Invitation } from '@documenso/prisma/client';

export const isInvitationExpired = (invitation: Invitation) => {
  return invitation.expires.getTime() < Date.now();
};
