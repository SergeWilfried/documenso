'use server';

import { prisma } from '@documenso/prisma';

export type GetOneTeamOptions = {
  key: { id: string } | { slug: string } | { name: string };
};

export const getTeamMember = async ({ key }: GetOneTeamOptions) => {
  return await prisma.team.findUniqueOrThrow({
    where: key,
  });
};
