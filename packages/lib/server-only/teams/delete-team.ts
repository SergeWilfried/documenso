'use server';

import { prisma } from '@documenso/prisma';

export interface deleteTeamOptions {
  key: { id: string } | { slug: string };
}

export const deleteTeam = async ({ key }: deleteTeamOptions) => {
  return await prisma.team.delete({
    where: key,
  });
};
