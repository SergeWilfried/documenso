import type { Metadata } from 'next';
import Link from 'next/link';

import { createTranslation } from '@documenso/lib/i18n/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@documenso/ui/primitives/accordion';
import { Button } from '@documenso/ui/primitives/button';

import { PricingTable } from '~/components/(marketing)/pricing-table';

export const metadata: Metadata = {
  title: 'Pricing',
};

export const dynamic = 'force-dynamic';

export type PricingPageProps = {
  searchParams?: {
    planId?: string;
    email?: string;
    name?: string;
    cancelled?: string;
  };
};

export default async function PricingPage() {
  const { t } = await createTranslation('marketing');
  return (
    <div className="mt-6 sm:mt-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold lg:text-5xl">{t('pricing')}</h1>

        <p className="text-foreground mt-4 text-lg leading-normal">
          {t('designed-for-every-stage-of-your-journey')}
        </p>
        <p className="text-foreground text-lg leading-normal">{t('get-started-today')}</p>
      </div>

      <div className="mt-12">
        <PricingTable />
      </div>

      <div className="mx-auto mt-36 max-w-2xl">
        <h2 className="text-center text-2xl font-semibold">
          {t('none-of-these-work-for-you-try-self-hosting')}
        </h2>

        <p className="text-muted-foreground mt-4 text-center leading-relaxed">
          {t('our-self-hosted-option')}
        </p>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full hover:cursor-pointer" asChild>
            <Link href="https://github.com/documenso/documenso" target="_blank">
              {t('get-started')}

            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-36 max-w-2xl">
        {/* FAQ Section */}

        <h2 className="text-4xl font-semibold">{t('faqs')}</h2>

        <Accordion type="multiple" className="mt-8">
          <AccordionItem value="plan-differences">
            <AccordionTrigger className="text-left text-lg font-semibold">
              {t('what-is-the-difference-between-the-plans')}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              {t('you-can-self-host-montampon')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-handling">
            <AccordionTrigger className="text-left text-lg font-semibold">
              {t('how-do-you-handle-my-data')}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              {t('securely-our-data-centers')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="should-use-cloud">
            <AccordionTrigger className="text-left text-lg font-semibold">
              {t('why-should-i-use-your-hosting-service')}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              {t('using-our-hosted-version')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-to-contribute">
            <AccordionTrigger className="text-left text-lg font-semibold">
              {t('how-can-i-contribute')}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              {t('thats-awesome-you-can-take-a-look-at-the-current')}{' '}
              <Link
                className="text-documenso-700 font-bold"
                href="https://github.com/documenso/documenso/milestones"
                target="_blank"
              >
                {t('issues')}
              </Link>{' '}
              {t('and-join-our')}{' '}
              <Link
                className="text-documenso-700 font-bold"
                href="https://documen.so/discord"
                target="_blank"
              >
                {t('discord-community')}
              </Link>{' '}
              {t('to-keep-up-to')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="why-prefer-documenso">
            <AccordionTrigger className="text-left text-lg font-semibold">
              {t('why-should-i-prefer-montampon-over-docusign-or-some-other-signing-tool')}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              {t('montampon-is-a-community-effort')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="where-can-i-get-support">
            <AccordionTrigger className="text-left text-lg font-semibold">
              {t('where-can-i-get-support')}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              {t('we-are-happy-to-assist-you-at')}{' '}
              <Link
                className="text-documenso-700 font-bold"
                target="_blank"
                rel="noreferrer"
                href="mailto:support@documenso.com"
              >
                support@documenso.com
              </Link>{' '}
              or{' '}
              <a
                className="text-documenso-700 font-bold"
                href="https://documen.so/discord"
                target="_blank"
                rel="noreferrer"
              >
                {t('in-our-discord-support-channel')}
              </a>{' '}
              {t('please-message-either')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
