'use server';

import { prisma } from '@documenso/prisma';
import type { Role } from '@documenso/prisma/client';

export type CreateTeamOptions = {
  name: string;
  slug: string;
  domain?: string;
  userId: number;
  defaultRole?: Role;
};

export const createTeam = async ({
  name,
  slug,
  domain,
  userId,
  defaultRole,
}: CreateTeamOptions) => {
  return await prisma.team.create({
    data: {
      name,
      slug,
      domain,
      defaultRole,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
