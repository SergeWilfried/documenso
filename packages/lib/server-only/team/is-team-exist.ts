'use server';

import { prisma } from '@documenso/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTeamExists = async (condition: any) => {
  return await prisma.team.count({
    where: {
      OR: condition,
    },
  });
};
