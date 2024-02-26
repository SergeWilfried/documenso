'use client';

import { useTransition } from 'react';

import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslation } from '@documenso/lib/i18n/client';
import { useUpdateSearchParams } from '@documenso/lib/client-only/hooks/use-update-search-params';
import type { FindResultSet } from '@documenso/lib/types/find-result-set';
import type { Document, Recipient, Team, User } from '@documenso/prisma/client';
import { ExtendedDocumentStatus } from '@documenso/prisma/types/extended-document-status';
import { DataTable } from '@documenso/ui/primitives/data-table';
import { DataTablePagination } from '@documenso/ui/primitives/data-table-pagination';

import { StackAvatarsWithTooltip } from '~/components/(dashboard)/avatar/stack-avatars-with-tooltip';
import { DocumentStatus } from '~/components/formatter/document-status';
import { LocaleDate } from '~/components/formatter/locale-date';

import { DataTableActionButton } from './data-table-action-button';
import { DataTableActionDropdown } from './data-table-action-dropdown';
import { DataTableTitle } from './data-table-title';

export type DocumentsDataTableProps = {
  results: FindResultSet<
    Document & {
      Recipient: Recipient[];
      User: Pick<User, 'id' | 'name' | 'email'>;
      team: Pick<Team, 'id' | 'url'> | null;
    }
  >;
  showSenderColumn?: boolean;
  team?: Pick<Team, 'id' | 'url'>;
};

export const DocumentsDataTable = ({
  results,
  showSenderColumn,
  team,
}: DocumentsDataTableProps) => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation('web');

  const updateSearchParams = useUpdateSearchParams();

  const onPaginationChange = (page: number, perPage: number) => {
    startTransition(() => {
      updateSearchParams({
        page,
        perPage,
      });
    });
  };

  if (!session) {
    return null;
  }

  return (
    <div className="relative">
      <DataTable
        columns={[
          {
            header: t('created'),
            accessorKey: 'createdAt',
            cell: ({ row }) => <LocaleDate date={row.original.createdAt} />,
          },
          {
            header: t('title'),
            cell: ({ row }) => <DataTableTitle row={row.original} teamUrl={team?.url} />,
          },
          {
            id: 'sender',
            header: t('sender'),
            cell: ({ row }) => row.original.User.name ?? row.original.User.email,
          },
          {
            header: t('recipient'),
            accessorKey: 'recipient',
            cell: ({ row }) => {
              return <StackAvatarsWithTooltip recipients={row.original.Recipient} />;
            },
          },
          {
            header: t('status'),
            accessorKey: 'status',
            cell: ({ row }) => <DocumentStatus status={row.getValue('status')} />,
          },
          {
            header: t('actions'),
            cell: ({ row }) =>
              (!row.original.deletedAt ||
                row.original.status === ExtendedDocumentStatus.COMPLETED) && (
                <div className="flex items-center gap-x-4">
                  <DataTableActionButton team={team} row={row.original} />
                  <DataTableActionDropdown team={team} row={row.original} />
                </div>
              ),
          },
        ]}
        data={results.data}
        perPage={results.perPage}
        currentPage={results.currentPage}
        totalPages={results.totalPages}
        onPaginationChange={onPaginationChange}
        columnVisibility={{
          sender: Boolean(showSenderColumn),
        }}
      >
        {(table) => <DataTablePagination additionalInformation="VisibleCount" table={table} />}
      </DataTable>

      {isPending && (
        <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
          <Loader className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};
