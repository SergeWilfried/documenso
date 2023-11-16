'use server';

import { prisma } from '@documenso/prisma';

export const deleteTeam = async (key: { id: string } | { slug: string }) => {
  return await prisma.team.delete({
    where: key,
  });
};
