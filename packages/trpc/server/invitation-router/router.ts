import { TRPCError } from '@trpc/server';

import { authenticatedProcedure, router } from '../trpc';
import {
  ZCreateInvitationMutationSchema,
  ZGetOrDeleteInvitationMutationSchema,
  ZUpdateInvitationMutationSchema,
} from './schema';

export const teamRouter = router({
  createInvitation: authenticatedProcedure
    .input(ZCreateInvitationMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Sample implementation - create an invitation in the database
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to send this document. Please try again later.',
        });
      }
    }),
  getInvitation: authenticatedProcedure
    .input(ZGetOrDeleteInvitationMutationSchema)
    .query(async ({ input, ctx }) => {
      try {
        // Sample implementation - get invitation from the database
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to get this invitation. Please try again later.',
        });
      }
    }),
  updateInvitation: authenticatedProcedure
    .input(ZUpdateInvitationMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Sample implementation - update invitation in the database
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to update this invitation. Please try again later.',
        });
      }
    }),
  deleteInvitation: authenticatedProcedure
    .input(ZGetOrDeleteInvitationMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Sample implementation - delete invitation from the database
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to delete this invitation. Please try again later.',
        });
      }
    }),
});
