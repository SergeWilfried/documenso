import { z } from '@documenso/lib/i18n/settings';

export const ZOSSFriendsSchema = z.array(
  z.object({
    name: z.string(),
    href: z.string().url(),
    description: z.string(),
  }),
);

export type TOSSFriendsSchema = z.infer<typeof ZOSSFriendsSchema>;
