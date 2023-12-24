'use server';

import { prisma } from '@documenso/prisma';

export type GetOneTeamOptions = {
  userId?: number;
  slug?: string;
};

export const getTeam = async ({ userId, slug }: GetOneTeamOptions) => {
  return await prisma.team.findUniqueOrThrow({
    where: {
      slug,
    },
  });
};
