import { TRPCError } from '@trpc/server';

import { createOrganization } from '@documenso/lib/server-only/organization/create-org';
import { deleteOrganizationFromDatabase } from '@documenso/lib/server-only/organization/delete-org';
import { getOrganizations } from '@documenso/lib/server-only/organization/get-all-org';
import { getOrganization } from '@documenso/lib/server-only/organization/get-one-org';
import { updateOrganizationDatabase } from '@documenso/lib/server-only/organization/update-org';

import { authenticatedProcedure, router } from '../trpc';
import {
  CreateOrganizationSchema,
  DeleteOrganizationSchema,
  ReadOrganizationSchema,
  UpdateOrganizationSchema,
} from './schema';

export const organizationRouter = router({
  createOrganization: authenticatedProcedure
    .input(CreateOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { slug, domain, name } = input;
        const updatedTeamMember = await createOrganization({
          userId: Number(ctx.user.id),
          name,
          slug,
          domain,
        });
        return updatedTeamMember;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to create organization. Please try again later.',
        });
      }
    }),
  updateOrganization: authenticatedProcedure
    .input(UpdateOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id, name, domain } = input;
        const userId = ctx.user.id;
        const updatedOrganization = await updateOrganizationDatabase({
          id,
          name,
          domain,
          userId,
        });
        return updatedOrganization;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to update organization. Please try again later.',
        });
      }
    }),
  deleteOrganization: authenticatedProcedure
    .input(DeleteOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id } = input;
        const userId = ctx.user.id;

        await deleteOrganizationFromDatabase({
          id,
          userId,
        });
        return true;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to delete organization. Please try again later.',
        });
      }
    }),
  readOneOrganization: authenticatedProcedure
    .input(ReadOrganizationSchema)
    .query(async ({ input, ctx }) => {
      try {
        const { slug } = input;
        const userId = ctx.user.id;

        const organization = await getOrganization({
          key: {
            userId,
            slug,
          },
        });
        return organization;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to read organization. Please try again later.',
        });
      }
    }),
  readAllOrganizations: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.user.id;
      const organizations = await getOrganizations(userId);
      return organizations;
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to read organizations. Please try again later.',
      });
    }
  }),
});
