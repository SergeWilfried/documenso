import { Mails } from 'lucide-react';

import { createTranslation } from '@documenso/lib/i18n/server';

import { SendConfirmationEmailForm } from '~/components/forms/send-confirmation-email';

export default async function UnverifiedAccount() {
  const { t } = await createTranslation('web');

  return (
    <div className="flex w-full items-start">
      <div className="mr-4 mt-1 hidden md:block">
        <Mails className="text-primary h-10 w-10" strokeWidth={2} />
      </div>
      <div className="">
        <h2 className="text-2xl font-bold md:text-4xl">{t('confirm-email')}</h2>

        <p className="text-muted-foreground mt-4">{t('to-gain-access-to-your-account-please')}</p>

        <p className="text-muted-foreground mt-4">{t('if-you-dont-find-the-confirmation-link')}</p>

          <SendConfirmationEmailForm />
        </div>
      </div>
    </div>
  );
}
