import { z } from 'zod';

export const ZCreateInvitationMutationSchema = z.object({
  teamId: z.string(),
  email: z.string().email(),
  role: z.enum(['OWNER', 'ADMIN', 'USER', 'MEMBER']),
});

export const ZUpdateInvitationMutationSchema = z.object({
  id: z.string().min(1),
  teamId: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(['OWNER', 'ADMIN', 'USER', 'MEMBER']).optional(),
  token: z.string().optional(),
  expires: z.string().optional(), // Assuming DateTime is represented as a string
});

export const ZDeleteInvitationMutationSchema = z.object({
  id: z.string(),
});

export const ZGetInvitationMutationByIdSchema = z.object({
  id: z.string(),
});

export const ZGetInvitationMutationByTokenSchema = z.object({
  token: z.string(),
});

export type ZCreateInvitationMutationSchema = z.infer<typeof ZCreateInvitationMutationSchema>;
export type ZUpdateInvitationMutationSchema = z.infer<typeof ZUpdateInvitationMutationSchema>;
export type ZDeleteInvitationMutationSchema = z.infer<typeof ZDeleteInvitationMutationSchema>;

export type ZGetInvitationMutationByIdSchema = z.infer<typeof ZGetInvitationMutationByIdSchema>;
export type ZGetInvitationMutationByTokenSchema = z.infer<
  typeof ZGetInvitationMutationByTokenSchema
>;
