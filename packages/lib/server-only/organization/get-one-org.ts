'use server';

import { prisma } from '@documenso/prisma';

export type GetOneOrganizationOptions = {
  key: { userId: number; slug: string };
};

export const getOrganization = async ({ key }: GetOneOrganizationOptions) => {
  const organization = await prisma.organization.findFirstOrThrow({
    where: key,
    include: {
      Team: true,
    },
  });
  return organization;
};
