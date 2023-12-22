'use server';

import { prisma } from '@documenso/prisma';

export type UpdateInvitationOptions = {
  id: string;
  teamId?: string;
  email?: string;
  role?: 'OWNER' | 'ADMIN' | 'USER' | 'MEMBER';
  token?: string;
  expires?: string; // Assuming DateTime is represented as a string
  invitedBy?: number; // Assuming this refers to the ID of the user who invited
};

export const updateInvitation = async (params: UpdateInvitationOptions) => {
  const { id, teamId, email, role, token, expires, invitedBy } = params;
  const updatedInvitation = await prisma.invitation.update({
    where: { id },
    data: {
      teamId,
      email,
      role,
      token,
      expires,
      invitedBy,
    },
  });
  return updatedInvitation;
};
