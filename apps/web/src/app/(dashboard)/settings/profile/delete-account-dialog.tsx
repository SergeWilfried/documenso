'use client';

import { useState } from 'react';

import { signOut } from 'next-auth/react';

import { useTranslation } from '@documenso/lib/i18n/client';
import type { User } from '@documenso/prisma/client';
import { TRPCClientError } from '@documenso/trpc/client';
import { trpc } from '@documenso/trpc/react';
import { Alert, AlertDescription, AlertTitle } from '@documenso/ui/primitives/alert';
import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@documenso/ui/primitives/dialog';
import { Input } from '@documenso/ui/primitives/input';
import { Label } from '@documenso/ui/primitives/label';
import { useToast } from '@documenso/ui/primitives/use-toast';

export type DeleteAccountDialogProps = {
  className?: string;
  user: User;
};

export const DeleteAccountDialog = ({ className, user }: DeleteAccountDialogProps) => {
  const { toast } = useToast();
  const { t } = useTranslation('web');
  const hasTwoFactorAuthentication = user.twoFactorEnabled;

  const [enteredEmail, setEnteredEmail] = useState<string>('');

  const { mutateAsync: deleteAccount, isLoading: isDeletingAccount } =
    trpc.profile.deleteAccount.useMutation();

  const onDeleteAccount = async () => {
    try {
      await deleteAccount();

      toast({
        title: t('account-deleted'),
        description: t('your-account-has-been-deleted-successfully'),
        duration: 5000,
      });

      return await signOut({ callbackUrl: '/' });
    } catch (err) {
      if (err instanceof TRPCClientError && err.data?.code === 'BAD_REQUEST') {
        toast({
          title: t('an-error-occurred'),
          description: err.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('an-unknown-error-occurred'),
          variant: 'destructive',
          description: err.message ?? t('we-encountered-an-unknown-error'),
        });
      }
    }
  };

  return (
    <div className={className}>
      <Alert
        className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row "
        variant="neutral"
      >
        <div>
          <AlertTitle>{t('delete-account')}</AlertTitle>
          <AlertDescription className="mr-2">{t('delete-your-account-and')}</AlertDescription>
        </div>

        <div className="flex-shrink-0">
          <Dialog onOpenChange={() => setEnteredEmail('')}>
            <DialogTrigger asChild>
              <Button variant="destructive">{t('delete-account')}</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="space-y-4">
                <DialogTitle>{t('delete-account')}</DialogTitle>

                <Alert variant="destructive">
                  <AlertDescription className="selection:bg-red-100">
                    {t('this-action-is-not-reversible-please-be-certain')}
                  </AlertDescription>
                </Alert>

                {hasTwoFactorAuthentication && (
                  <Alert variant="destructive">
                    <AlertDescription className="selection:bg-red-100">
                      {t('disable-two-factor-authentication-before-deleting-your-account')}
                    </AlertDescription>
                  </Alert>
                )}

                <DialogDescription>
                  {t('documenso-will-delete')}{' '}
                  <span className="font-semibold">{t('all-of-your-documents')}</span>
                  {t('along-with-all-of')}
                </DialogDescription>
              </DialogHeader>

              {!hasTwoFactorAuthentication && (
                <div className="mt-4">
                  <Label>
                    Please type{' '}
                    <span className="text-muted-foreground font-semibold">{user.email}</span> to
                    confirm.
                  </Label>

                  <Input
                    type="text"
                    className="mt-2"
                    aria-label="Confirm Email"
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                  />
                </div>
              )}
              <DialogFooter>
                <Button
                  onClick={onDeleteAccount}
                  loading={isDeletingAccount}
                  variant="destructive"
                  disabled={hasTwoFactorAuthentication || enteredEmail !== user.email}
                >
                  {isDeletingAccount ? t('deleting-account') : t('delete-account')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Alert>
    </div>
  );
};
