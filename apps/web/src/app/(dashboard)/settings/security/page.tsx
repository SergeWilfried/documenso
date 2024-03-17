import type { Metadata } from 'next';
import Link from 'next/link';

import { IDENTITY_PROVIDER_NAME } from '@documenso/lib/constants/auth';
import { createTranslation } from '@documenso/lib/i18n/server';
import { getRequiredServerComponentSession } from '@documenso/lib/next-auth/get-server-component-session';
import { Alert, AlertDescription, AlertTitle } from '@documenso/ui/primitives/alert';
import { Button } from '@documenso/ui/primitives/button';

import { SettingsHeader } from '~/components/(dashboard)/settings/layout/header';
import { AuthenticatorApp } from '~/components/forms/2fa/authenticator-app';
import { RecoveryCodes } from '~/components/forms/2fa/recovery-codes';
import { PasswordForm } from '~/components/forms/password';

export const metadata: Metadata = {
  title: 'Security',
};

export default async function SecuritySettingsPage() {
  const { user } = await getRequiredServerComponentSession();
  const { t } = await createTranslation('web');
  return (
    <div>
      <SettingsHeader
        title={t('security')}
        subtitle={t('here-you-can-manage-your-password-and-security-settings')}
      />

      {user.identityProvider === 'DOCUMENSO' ? (
        <div>
          <PasswordForm user={user} />

          <hr className="border-border/50 mt-6" />

          <Alert
            className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
            variant="neutral"
          >
            <div className="mb-4 sm:mb-0">
              <AlertTitle>{t('two-factor-authentication')}</AlertTitle>

              <AlertDescription className="mr-4">{t('create-one-time-passwords')}</AlertDescription>
            </div>

            <AuthenticatorApp isTwoFactorEnabled={user.twoFactorEnabled} />
          </Alert>

          {user.twoFactorEnabled && (
            <Alert
              className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
              variant="neutral"
            >
              <div className="mb-4 sm:mb-0">
                <AlertTitle>{t('recovery-codes')}</AlertTitle>

                <AlertDescription className="mr-4">
                  {t('two-factor-authentication-recovery')}
                </AlertDescription>
              </div>

              <RecoveryCodes isTwoFactorEnabled={user.twoFactorEnabled} />
            </Alert>
          )}
        </div>
      ) : (
        <Alert className="p-6" variant="neutral">
          <AlertTitle>
            {t('your-account-is-managed-by')} {IDENTITY_PROVIDER_NAME[user.identityProvider]}
          </AlertTitle>

          <AlertDescription>
            {t('to-update-your-password', {
              provider: IDENTITY_PROVIDER_NAME[user.identityProvider],
            })}
          </AlertDescription>
        </Alert>
      )}

      <Alert
        className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
        variant="neutral"
      >
        <div className="mb-4 mr-4 sm:mb-0">
          <AlertTitle>{t('recent-activity')}</AlertTitle>

          <AlertDescription className="mr-2">
            {t('view-all-recent-security-activity-related-to-your-account')}
          </AlertDescription>
        </div>

        <Button asChild>
          <Link href="/settings/security/activity">{t('view-activity')}</Link>
        </Button>
      </Alert>
    </div>
  );
}
