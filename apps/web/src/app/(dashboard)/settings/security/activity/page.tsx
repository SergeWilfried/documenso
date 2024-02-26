import type { Metadata } from 'next';

import { createTranslation } from '@documenso/lib/i18n/server';

import { UserSecurityActivityDataTable } from './user-security-activity-data-table';

export const metadata: Metadata = {
  title: 'Security activity',
};

export default async function SettingsSecurityActivityPage() {
  const { t } = await createTranslation('web');
  return (
    <div>
      <h3 className="text-2xl font-semibold">{t('security-activity')}</h3>

      <p className="text-muted-foreground mt-2 text-sm">
        {t('view-all-recent-security-activity-related-to-your-account')}
      </p>

      <hr className="my-4" />

      <UserSecurityActivityDataTable />
    </div>
  );
}
