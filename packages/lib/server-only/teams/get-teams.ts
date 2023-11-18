'use server';

import { prisma } from '@documenso/prisma';

export interface getTeamsOptions {
  userId: number;
}
export const getTeams = async ({ userId }: getTeamsOptions) => {
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
