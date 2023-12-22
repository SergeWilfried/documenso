'use server';

import { prisma } from '@documenso/prisma';

export type DeleteInvitationOptions = {
  id: string;
};

export const deleteInvitation = async ({ id }: DeleteInvitationOptions) => {
  const deletedInvitation = await prisma.invitation.delete({
    where: { id },
  });
  return deletedInvitation;
};
