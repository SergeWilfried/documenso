'use server';

import { prisma } from '@documenso/prisma';

export type GetAllTeamsOptions = {
  key: { teamId: string };
};

export const getAllTeams = async ({ key }: GetAllTeamsOptions) => {
  return await prisma.team.findMany({
    where: {
      Member: {
        some: key,
      },
    },
    include: {
      _count: {
        select: { Member: true },
      },
    },
  });
};
