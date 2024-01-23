import { createElement } from 'react';

import { mailer } from '@documenso/email/mailer';
import { render } from '@documenso/email/render';
import { DocumentInviteEmailTemplate } from '@documenso/email/templates/document-invite';
import { FROM_ADDRESS, FROM_NAME } from '@documenso/lib/constants/email';
import { renderCustomEmailTemplate } from '@documenso/lib/utils/render-custom-email-template';
import { prisma } from '@documenso/prisma';
import { DocumentStatus, NotificationsChannel, SendStatus } from '@documenso/prisma/client';

import { sendTextMessage } from '../notifications/text/send-message';
import { DocumentInviteTextMessageTemplate } from '../notifications/text/templates/document-invite';

export type SendDocumentOptions = {
  documentId: number;
  userId: number;
};

export const sendDocument = async ({ documentId, userId }: SendDocumentOptions) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  });

  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
      userId,
    },
    include: {
      Recipient: true,
      documentMeta: true,
    },
  });

  const customEmail = document?.documentMeta;

  if (!document) {
    throw new Error('Document not found');
  }

  if (document.Recipient.length === 0) {
    throw new Error('Document has no recipients');
  }

  if (document.status === DocumentStatus.COMPLETED) {
    throw new Error('Can not send completed document');
  }

  await Promise.all(
    document.Recipient.map(async (recipient) => {
      const { email, name } = recipient;

      const customEmailTemplate = {
        'signer.name': name,
        'signer.email': email,
        'document.name': document.title,
      };

      if (recipient.sendStatus === SendStatus.SENT) {
        return;
      }

      const assetBaseUrl = process.env.NEXT_PUBLIC_WEBAPP_URL || 'http://localhost:3000';
      const signDocumentLink = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/sign/${recipient.token}`;
      if (recipient.notificationChannel === NotificationsChannel.EMAIL) {
        const template = createElement(DocumentInviteEmailTemplate, {
          documentName: document.title,
          inviterName: user.name || undefined,
          inviterEmail: user.email,
          assetBaseUrl,
          signDocumentLink,
          customBody: renderCustomEmailTemplate(customEmail?.message || '', customEmailTemplate),
        });

        await mailer.sendMail({
          to: {
            address: email,
            name,
          },
          from: {
            name: FROM_NAME,
            address: FROM_ADDRESS,
          },
          subject: customEmail?.subject
            ? renderCustomEmailTemplate(customEmail.subject, customEmailTemplate)
            : 'Please sign this document',
          html: render(template),
          text: render(template, { plainText: true }),
        });
      } else if (
        recipient.notificationChannel === NotificationsChannel.SMS &&
        recipient.phoneNumber
      ) {
        const message = DocumentInviteTextMessageTemplate({
          inviterName: FROM_NAME,
          documentName: document.title,
          signDocumentLink: signDocumentLink,
        });
        await sendTextMessage({
          phone: recipient.phoneNumber,
          message: message,
        });
      }
      await prisma.recipient.update({
        where: {
          id: recipient.id,
        },
        data: {
          sendStatus: SendStatus.SENT,
        },
      });
    }),
  );

  const updatedDocument = await prisma.document.update({
    where: {
      id: documentId,
    },
    data: {
      status: DocumentStatus.PENDING,
    },
  });

  return updatedDocument;
};
