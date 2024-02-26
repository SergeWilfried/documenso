import type { Metadata } from 'next';

import { createTranslation } from '@documenso/lib/i18n/server';
import { getRequiredServerComponentSession } from '@documenso/lib/next-auth/get-server-component-session';

import { SettingsHeader } from '~/components/(dashboard)/settings/layout/header';
import { ProfileForm } from '~/components/forms/profile';

import { DeleteAccountDialog } from './delete-account-dialog';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfileSettingsPage() {
  const { user } = await getRequiredServerComponentSession();
  const { t } = await createTranslation('web');
  return (
    <div>
      <SettingsHeader
        title={t('profile')}
        subtitle={t('here-you-can-edit-your-personal-details')}
      />

      <ProfileForm className="max-w-xl" user={user} />

      <DeleteAccountDialog className="mt-8 max-w-xl" user={user} />
    </div>
  );
}
