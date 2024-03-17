import { DateTime } from 'luxon';

import { createTranslation } from '@documenso/lib/i18n/server';
import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { getRequiredServerComponentSession } from '@documenso/lib/next-auth/get-server-component-session';
import { getUserTokens } from '@documenso/lib/server-only/public-api/get-all-user-tokens';
import { Button } from '@documenso/ui/primitives/button';

import DeleteTokenDialog from '~/components/(dashboard)/settings/token/delete-token-dialog';
import { LocaleDate } from '~/components/formatter/locale-date';
import { ApiTokenForm } from '~/components/forms/token';

export default async function ApiTokensPage() {
  const { user } = await getRequiredServerComponentSession();
  const { t } = await createTranslation('web');

  const tokens = await getUserTokens({ userId: user.id });

  return (
    <div>
      <h3 className="text-2xl font-semibold">{t('api-tokens')}</h3>

      <p className="text-muted-foreground mt-2 text-sm">
        On this page, you can create new API tokens and manage the existing ones. <br />
        You can view our swagger docs{' '}
        <a
          className="text-primary underline"
          href={`${NEXT_PUBLIC_WEBAPP_URL()}/api/v1/openapi`}
          target="_blank"
        >
          here
        </a>
      </p>

      <hr className="my-4" />

      <ApiTokenForm className="max-w-xl" />

      <hr className="mb-4 mt-8" />

      <h4 className="text-xl font-medium">{t('your-existing-tokens')}</h4>

      {tokens.length === 0 && (
        <div className="mb-4">
          <p className="text-muted-foreground mt-2 text-sm italic">
            {t('your-tokens-will-be-shown-here-once-you-create-them')}
          </p>
        </div>
      )}

      {tokens.length > 0 && (
        <div className="mt-4 flex max-w-xl flex-col gap-y-4">
          {tokens.map((token) => (
            <div key={token.id} className="border-border rounded-lg border p-4">
              <div className="flex items-center justify-between gap-x-4">
                <div>
                  <h5 className="text-base">{token.name}</h5>

                  <p className="text-muted-foreground mt-2 text-xs">
                    {t('created-on')}{' '}
                    <LocaleDate date={token.createdAt} format={DateTime.DATETIME_FULL} />
                  </p>
                  {token.expires ? (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {t('expires-on')}{' '}
                      <LocaleDate date={token.expires} format={DateTime.DATETIME_FULL} />
                    </p>
                  ) : (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {t('token-doesnt-have-an-expiration-date')}
                    </p>
                  )}
                </div>

                <div>
                  <DeleteTokenDialog token={token}>
                    <Button variant="destructive">{t('delete')}</Button>
                  </DeleteTokenDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
