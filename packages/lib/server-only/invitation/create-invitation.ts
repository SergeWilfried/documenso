'use server';

import { prisma } from '@documenso/prisma';

export type CreateInvitationOptions = {
  teamId: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'USER' | 'MEMBER';
  invitedBy: number; // Assuming this refers to the ID of the user who invited
  token: string;
  expires: Date;
};

export const createNewInvitation = async (options: CreateInvitationOptions) => {
  const newInvitation = await prisma.invitation.create({
    data: {
      ...options,
    },
  });
  return newInvitation;
};
