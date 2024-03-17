import { z } from '@documenso/lib/i18n/settings';

import { createTranslation } from '@documenso/lib/i18n/server';

const {t} = await createTranslation('common');

export const ZAddTitleFormSchema = z.object({
  title: z.string().trim().min(1, { message: t('title-cant-be-empty') }),
});

export type TAddTitleFormSchema = z.infer<typeof ZAddTitleFormSchema>;
