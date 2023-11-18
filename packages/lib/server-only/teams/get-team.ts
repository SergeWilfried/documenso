'use server';

import { prisma } from '@documenso/prisma';

export interface getTeamOptions {
  key: { id: string } | { slug: string };
}

export const getTeam = async ({ key }: getTeamOptions) => {
  return await prisma.team.findUniqueOrThrow({
    where: key,
  });
};
