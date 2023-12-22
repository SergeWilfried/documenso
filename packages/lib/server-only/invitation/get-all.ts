'use server';

import { prisma } from '@documenso/prisma';

export type GetInvitationOptions = {
  key: { teamId: string };
};

export const getAllInvitations = async ({ key }: GetInvitationOptions) => {
  const invitation = await prisma.invitation.findMany({
    where: key,
    select: {
      id: true,
      email: true,
      role: true,
      expires: true,
    },
  });
  return invitation;
};
