'use server';

import { prisma } from '@documenso/prisma';

export type DeleteTeamOptions = {
  key: { id: string } | { name: string } | { slug: string };
};

export const deleteTeamFromDatabase = async ({ key }: DeleteTeamOptions) => {
  return await prisma.team.delete({
    where: key,
  });
};
