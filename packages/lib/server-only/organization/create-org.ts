'use server';

import { prisma } from '@documenso/prisma';

export type CreateOrganizationOptions = {
  userId: number;
  name: string;
  slug?: string;
  domain?: string;
};

export const createOrganization = async ({
  name,
  slug,
  domain,
  userId,
}: CreateOrganizationOptions) => {
  const validatedSlug = slug ? slug : name.toLowerCase().replace(/\s+/g, '-').substring(0, 4);
  return await prisma.organization.create({
    data: {
      name,
      slug: validatedSlug,
      domain,
      User: {
        connect: { id: userId },
      },
    },
  });
};
