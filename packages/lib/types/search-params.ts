import { z } from '@documenso/lib/i18n/settings';

export const ZBaseTableSearchParamsSchema = z.object({
  query: z
    .string()
    .optional()
    .catch(() => undefined),
  page: z.coerce
    .number()
    .min(1)
    .optional()
    .catch(() => undefined),
  perPage: z.coerce
    .number()
    .min(1)
    .optional()
    .catch(() => undefined),
});

export type TBaseTableSearchParamsSchema = z.infer<typeof ZBaseTableSearchParamsSchema>;
