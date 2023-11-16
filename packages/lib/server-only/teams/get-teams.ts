'use server';

import { prisma } from '@documenso/prisma';

export const getTeams = async (userId: number) => {
  return await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      _count: {
        select: { members: true },
      },
    },
  });
};
