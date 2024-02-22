import { z } from '@documenso/lib/i18n/settings';
import { createTranslation } from '@documenso/lib/i18n/server';

import { DEFAULT_DOCUMENT_DATE_FORMAT } from '@documenso/lib/constants/date-formats';
import { DEFAULT_DOCUMENT_TIME_ZONE } from '@documenso/lib/constants/time-zones';
import { URL_REGEX } from '@documenso/lib/constants/url-regex';

const {t} = await createTranslation('common');

export const ZAddSubjectFormSchema = z.object({
  meta: z.object({
    subject: z.string(),
    message: z.string(),
    timezone: z.string().optional().default(DEFAULT_DOCUMENT_TIME_ZONE),
    dateFormat: z.string().optional().default(DEFAULT_DOCUMENT_DATE_FORMAT),
    redirectUrl: z
      .string()
      .optional()
      .refine((value) => value === undefined || value === '' || URL_REGEX.test(value), {
        message: t('please-enter-a-valid-url'),
      }),
  }),
});

export type TAddSubjectFormSchema = z.infer<typeof ZAddSubjectFormSchema>;
