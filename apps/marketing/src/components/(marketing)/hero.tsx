'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { usePlausible } from 'next-plausible';
import { LuGithub } from 'react-icons/lu';
import { match } from 'ts-pattern';
import { useTranslation } from '@documenso/lib/i18n/client';

import backgroundPattern from '@documenso/assets/images/background-pattern.png';
import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';

import { Widget } from './widget';

export type HeroProps = {
  className?: string;
  [key: string]: unknown;
};

const BackgroundPatternVariants: Variants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,

    transition: {
      delay: 1,
      duration: 1.2,
    },
  },
};

const HeroTitleVariants: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const Hero = ({ className, ...props }: HeroProps) => {
  const event = usePlausible();
  const { t } = useTranslation('marketing');

  const { getFlag } = useFeatureFlags();

  const heroMarketingCTA = getFlag('marketing_landing_hero_cta');

  const onSignUpClick = () => {
    const el = document.getElementById('email');

    if (el) {
      const { top } = el.getBoundingClientRect();

      window.scrollTo({
        top: top - 120,
        behavior: 'smooth',
      });

      requestAnimationFrame(() => {
        el.focus();
      });
    }
  };

  return (
    <motion.div className={cn('relative', className)} {...props}>
      <div className="absolute -inset-24 -z-10">
        <motion.div
          className="flex h-full w-full origin-top-right items-center justify-center"
          variants={BackgroundPatternVariants}
          initial="initial"
          animate="animate"
        >
          <Image
            src={backgroundPattern}
            alt="background pattern"
            className="-mr-[50vw] -mt-[15vh] h-full scale-125 object-cover dark:contrast-[70%] dark:invert dark:sepia md:scale-150 lg:scale-[175%]"
          />
        </motion.div>
      </div>

      <div className="relative">
        <motion.h2
          variants={HeroTitleVariants}
          initial="initial"
          animate="animate"
          className="text-center text-4xl font-bold leading-tight tracking-tight lg:text-[64px]"
        >
          {t('document-signing')}
          <span className="block" /> {t('finally-open-source')}
        </motion.h2>

        <motion.div
          variants={HeroTitleVariants}
          initial="initial"
          animate="animate"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          <Button
            type="button"
            variant="outline"
            className="rounded-full bg-transparent backdrop-blur-sm"
            onClick={onSignUpClick}
          >
            {t('get-the-early-adopters-plan')}
            <span className="bg-primary dark:text-background -mr-2.5 ml-2.5 rounded-full px-2 py-1.5 text-xs">
              {t('30-mo-forever')}
            </span>
          </Button>

          <Link href="https://calendly.com/sergewilfried/30min" onClick={() => event('schedule-demo')}>
            <Button variant="outline" className="rounded-full bg-transparent backdrop-blur-sm">
              <LuGithub className="mr-2 h-5 w-5" />
              {t('book-a-demo')}
            </Button>
          </Link>
        </motion.div>

        {match(heroMarketingCTA)
          .with('spm', () => (
            <motion.div
              variants={HeroTitleVariants}
              initial="initial"
              animate="animate"
              className="border-primary bg-background hover:bg-muted mx-auto mt-8 w-60 rounded-xl border transition-colors duration-300"
            >
              <Link href="/singleplayer" className="block px-4 py-2 text-center">
                <h2 className="text-muted-foreground text-xs font-semibold">
                  {t('introducing-single-player-mode')}
                </h2>

                <h1 className="text-foreground mt-1.5 font-medium leading-5">
                  {t('self-sign-for-free')}
                </h1>
              </Link>
            </motion.div>
          ))
          .with('productHunt', () => (
            <motion.div
              variants={HeroTitleVariants}
              initial="initial"
              animate="animate"
              className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-4"
            >
              <Link
                href="https://www.producthunt.com/posts/documenso?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-documenso"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=395047&theme=light&period=daily"
                  alt={t('montampon-the-open-source-docusign-alternative-or-product-hunt')}
                  style={{ width: '250px', height: '54px' }}
                />
              </Link>
            </motion.div>
          ))
          .otherwise(() => null)}

        <motion.div
          className="mt-12"
          variants={{
            initial: {
              scale: 0.2,
              opacity: 0,
            },
            animate: {
              scale: 1,
              opacity: 1,
              transition: {
                ease: 'easeInOut',
                delay: 0.5,
                duration: 0.8,
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <Widget className="mt-12">
            <strong>{t('montampon-supporter-pledge')}</strong>
            <p className="w-full max-w-[70ch]">
              {t('welcome-to-montampon-where-our-mission-is-to-transform-the-digital-signing-landscape')}
            </p>

            <p className="w-full max-w-[70ch]">
              {t('at-the-core-of-montampon-is-our-dedication-to-trust')}
            </p>

            <p className="w-full max-w-[70ch]">
              {t('we-envision-a-future-where-digital-transactions')}
            </p>

            <p className="w-full max-w-[70ch]">
              {t('montampon-is-built-on-the-belief-that-diversity-and-inclusivity-lead-to-innovation-we-welcome-contributions-from-everyone-valuing-the-variety-of-perspectives-that-shape-our-platform-and-services-by-joining-us-youre-not-just-using-a-service-youre-supporting-a-vision-of-a-more-open-cooperative-digital-world')}
            </p>

            <p className="w-full max-w-[70ch]">
              {t('today-we-invite-you-to-join-us')}{' '}
              <span className="bg-primary text-black">
                {(`${t('in-a-non-legally-binding-but-heartfelt-way')}`)}
              </span>{' '}
              {t('and-lock-in-the-early-supporter-plan-for-forever-including-everything-we-build-this-year')}
            </p>

            <div className="flex h-24 items-center">
              <p className={cn('text-5xl [font-family:var(--font-caveat)]')}>{t('timur-and-lucas')}</p>
            </div>

            <div>
              <strong>{t('timur-ercan-and-lucas-smith')}</strong>
              <p className="mt-1">{t('co-founders-montampon')}</p>
            </div>
          </Widget>
        </motion.div>
      </div>
    </motion.div>
  );
};
