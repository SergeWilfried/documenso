'use client';

import { useState } from 'react';

import type { TeamEmail } from '@documenso/prisma/client';
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
import { useToast } from '@documenso/ui/primitives/use-toast';

export type TeamEmailUsageProps = {
  teamEmail: TeamEmail & { team: { name: string; url: string } };
};

export const TeamEmailUsage = ({ teamEmail }: TeamEmailUsageProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('web');
  const { toast } = useToast();

  const { mutateAsync: deleteTeamEmail, isLoading: isDeletingTeamEmail } =
    trpc.team.deleteTeamEmail.useMutation({
      onSuccess: () => {
        toast({
          title: t('success'),
          description: t('you-have-successfully-revoked-access'),
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: t('something-went-wrong'),
          variant: 'destructive',
          duration: 10000,
          description: t('we-encountered-an-unknown-error-while-revoking'),
        });
      },
    });

  return (
    <Alert variant="neutral" className="flex flex-row items-center justify-between p-6">
      <div>
        <AlertTitle className="mb-0">{t('team-email')}</AlertTitle>
        <AlertDescription>
          <p>
            {t('your-email-is-currently-being-used-by-team')}{' '}
            <span className="font-semibold">{teamEmail.team.name}</span> ({teamEmail.team.url}
            ).
          </p>

          <p className="mt-1">{t('they-have-permission-on-your-behalf-to')}</p>

          <ul className="mt-0.5 list-inside list-disc">
            <li>{t('display-your-name-and-email-in-documents')}</li>
            <li>{t('view-all-documents-sent-to-your-account')}</li>
          </ul>
        </AlertDescription>
      </div>

      <Dialog open={open} onOpenChange={(value) => !isDeletingTeamEmail && setOpen(value)}>
        <DialogTrigger asChild>
          <Button variant="destructive">{t('revoke-access')}</Button>
        </DialogTrigger>

        <DialogContent position="center">
          <DialogHeader>
            <DialogTitle>{t('are-you-sure')}</DialogTitle>

            <DialogDescription className="mt-4">
              {t('you-are-about-to-revoke-access-for-team')}{' '}
              <span className="font-semibold">{teamEmail.team.name}</span> ({teamEmail.team.url}{t('to-use-your-email')}
            </DialogDescription>
          </DialogHeader>

          <fieldset disabled={isDeletingTeamEmail}>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                {t('cancel')}
              </Button>

              <Button
                type="submit"
                variant="destructive"
                loading={isDeletingTeamEmail}
                onClick={async () => deleteTeamEmail({ teamId: teamEmail.teamId })}
              >
                {t('revoke')}
              </Button>
            </DialogFooter>
          </fieldset>
        </DialogContent>
      </Dialog>
    </Alert>
  );
};
