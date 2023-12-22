'use server';

import { prisma } from '@documenso/prisma';

export type GetInvitationOptions = {
  key: { id: string } | { token: string };
};

export const getInvitation = async ({ key }: GetInvitationOptions) => {
  const invitation = await prisma.invitation.findUnique({
    where: key,
    include: {
      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return invitation;
};
