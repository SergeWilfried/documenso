import { z } from '@documenso/lib/i18n/settings';

export const ZFeatureFlagValueSchema = z.union([
  z.boolean(),
  z.string(),
  z.number(),
  z.undefined(),
]);

export type TFeatureFlagValue = z.infer<typeof ZFeatureFlagValueSchema>;
