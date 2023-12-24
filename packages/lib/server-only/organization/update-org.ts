'use server';

import { prisma } from '@documenso/prisma';

export type UpdateOrganizationOptions = {
  id: string;
  name?: string;
  domain?: string;
  userId: number;
};

export const updateOrganizationDatabase = async ({
  id,
  userId,
  name,
  domain,
}: UpdateOrganizationOptions) => {
  return await prisma.organization.update({
    where: {
      id,
      User: {
        id: userId,
      },
    },
    data: {
      name,
      domain,
    },
  });
};
