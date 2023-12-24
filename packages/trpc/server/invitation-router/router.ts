import { TRPCError } from '@trpc/server';
import { nanoid } from 'nanoid';

import { createNewInvitation } from '@documenso/lib/server-only/invitation/create-invitation';
import { deleteInvitation } from '@documenso/lib/server-only/invitation/delete-invitation';
import { getInvitation } from '@documenso/lib/server-only/invitation/get-one';
import { updateInvitation } from '@documenso/lib/server-only/invitation/update-invitation';

import { authenticatedProcedure, router } from '../trpc';
import {
  ZCreateInvitationMutationSchema,
  ZDeleteInvitationMutationSchema,
  ZGetInvitationMutationByIdSchema,
  ZGetInvitationMutationByTokenSchema,
  ZUpdateInvitationMutationSchema,
} from './schema';

export const invitationRouter = router({
  createInvitation: authenticatedProcedure
    .input(ZCreateInvitationMutationSchema)
    .mutation(async ({ input, ctx }) => {
      const { teamId, role, email } = input;
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const token = nanoid();
      const invitedBy = ctx.user.id;
      try {
        const response = await createNewInvitation({
          teamId,
          email,
          role,
          invitedBy,
          token,
          expires,
        });
        return response;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to send this document. Please try again later.',
        });
      }
    }),
  getInvitationById: authenticatedProcedure
    .input(ZGetInvitationMutationByIdSchema)
    .query(async ({ input, ctx }) => {
      const { id } = input;

      try {
        const invitation = await getInvitation({ key: { id } });
        return invitation;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to get this invitation. Please try again later.',
        });
      }
    }),
  getInvitationByToken: authenticatedProcedure
    .input(ZGetInvitationMutationByTokenSchema)
    .query(async ({ input, ctx }) => {
      const { token } = input;
      try {
        const invitation = await getInvitation({ key: { token } });
        return invitation;
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
      const { id, teamId, role, email, token, expires } = input;
      const invitedBy = ctx.user.id;
      try {
        const response = await updateInvitation({
          id,
          teamId,
          role,
          email,
          token,
          invitedBy,
          expires,
        });
        return response;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to update this invitation. Please try again later.',
        });
      }
    }),
  deleteInvitation: authenticatedProcedure
    .input(ZDeleteInvitationMutationSchema)
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      try {
        const response = await deleteInvitation({ id });
        return response;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'We were unable to delete this invitation. Please try again later.',
        });
      }
    }),
});
