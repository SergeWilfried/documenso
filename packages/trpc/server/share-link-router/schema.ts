import { z } from '@documenso/lib/i18n/settings';

export const ZCreateOrGetShareLinkMutationSchema = z.object({
  documentId: z.number(),
  token: z.string().optional(),
});

export type TCreateOrGetShareLinkMutationSchema = z.infer<
  typeof ZCreateOrGetShareLinkMutationSchema
>;
