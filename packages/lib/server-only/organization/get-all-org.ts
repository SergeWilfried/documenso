'use server';

import { prisma } from '@documenso/prisma';

export const getOrganizations = async (userId: number) => {
  return await prisma.organization.findMany({
    where: {
      User: { id: userId },
    },
    include: {
      User: {
        select: {
          name: true,
          email: true,
        },
      },
      Team: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });
};
