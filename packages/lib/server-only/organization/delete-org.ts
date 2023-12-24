'use server';

import { prisma } from '@documenso/prisma';

export type DeleteOrganizationOptions = {
  userId: number;
  id: string;
};

export const deleteOrganizationFromDatabase = async ({ userId, id }: DeleteOrganizationOptions) => {
  return await prisma.organization.delete({
    where: {
      id,
      User: {
        id: userId,
      },
    },
  });
};
