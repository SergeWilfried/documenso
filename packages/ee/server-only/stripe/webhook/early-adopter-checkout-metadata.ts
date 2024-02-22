import { z } from '@documenso/lib/i18n/settings';

export const ZEarlyAdopterCheckoutMetadataSchema = z.object({
  name: z.string(),
  email: z.string(),
  signatureText: z.string(),
  signatureDataUrl: z.string().optional(),
  source: z.literal('marketing'),
});

export type TEarlyAdopterCheckoutMetadataSchema = z.infer<
  typeof ZEarlyAdopterCheckoutMetadataSchema
>;
