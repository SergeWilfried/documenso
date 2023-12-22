'use server';

import { prisma } from '@documenso/prisma';

export type UpdateInvitationOptions = {
  teamId?: string;
  email?: string;
  role?: 'OWNER' | 'ADMIN' | 'USER' | 'MEMBER';
  token?: string;
  expires?: string; // Assuming DateTime is represented as a string
  invitedBy?: number; // Assuming this refers to the ID of the user who invited
};

export const updateInvitation = async (id: string, values: UpdateInvitationOptions) => {
  const updatedInvitation = await prisma.invitation.update({
    where: { id },
    data: values,
  });
  return updatedInvitation;
};
