'use server';

import { nanoid } from 'nanoid';

import { prisma } from '@documenso/prisma';

export type CreateInvitationOptions = {
  teamId: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'USER' | 'MEMBER';
  invitedBy: number; // Assuming this refers to the ID of the user who invited
};

export const createNewInvitation = async (options: CreateInvitationOptions) => {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = nanoid();

  const newInvitation = await prisma.invitation.create({
    data: {
      ...options,
      expires,
      token,
    },
  });
  return newInvitation;
};
