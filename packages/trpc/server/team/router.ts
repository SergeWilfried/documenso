import { TRPCError } from '@trpc/server';

import {
  createTeam,
  deleteTeamFromDatabase,
  getTeam,
  updateTeamInDatabase,
} from '@documenso/lib/server-only/team/index';
import type { Role } from '@documenso/prisma/client';

import { authenticatedProcedure, router } from '../trpc';
import {
  ZCreateTeamMutationSchema,
  ZDeleteTeamMutationSchema,
  ZGetTeamQuerySchema,
  ZUpdateTeamMutationSchema,
} from './schema';

export const teamRouter = router({
  createTeam: authenticatedProcedure
    .input(ZCreateTeamMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { name, slug, domain, defaultRole } = input;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const formattedRole = defaultRole as Role;

        // Sample implementation - create a team in the database
        const newTeam = await createTeam({ name, slug, domain, defaultRole: formattedRole });
        return newTeam;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to send this document. Please try again later.',
        });
      }
    }),
  getTeam: authenticatedProcedure.input(ZGetTeamQuerySchema).query(async ({ input, ctx }) => {
    try {
      const { userId, slug } = input;

      // Sample implementation - get the team from the database
      const team = await getTeam({ userId, slug });

      return team;
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'We were unable to retrieve the team. Please try again later.',
      });
    }
  }),

  updateTeam: authenticatedProcedure
    .input(ZUpdateTeamMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id, name, slug, domain } = input;

        // Sample implementation - update the team in the database
        const updatedTeam = await updateTeamInDatabase({ id, name, slug, domain });

        return updatedTeam;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to send this document. Please try again later.',
        });
      }
    }),

  deleteTeam: authenticatedProcedure
    .input(ZDeleteTeamMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id } = input;

        // Sample implementation - delete the team from the database
        const deletionResult = await deleteTeamFromDatabase({ key: { id } });

        return deletionResult;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to send this document. Please try again later.',
        });
      }
    }),
  // Add more procedures here as needed
});
