'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@documenso/lib/i18n/client';

import LogoImage from '@documenso/assets/logo.png';
import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { cn } from '@documenso/ui/lib/utils';

import { HamburgerMenu } from './mobile-hamburger';
import { MobileNavigation } from './mobile-navigation';

export type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const { t } = useTranslation('marketing');

  const { getFlag } = useFeatureFlags();

  const isSinglePlayerModeMarketingEnabled = getFlag('marketing_header_single_player_mode');

  return (
    <header className={cn('flex items-center justify-between', className)} {...props}>
      <div className="flex items-center space-x-4">
        <Link href="/" className="z-10" onClick={() => setIsHamburgerMenuOpen(false)}>
          <Image
            src={LogoImage}
            alt="MonTampon Logo"
            className="dark:invert"
            width={170}
            height={25}
          />
        </Link>

        {isSinglePlayerModeMarketingEnabled && (
          <Link
            href="/singleplayer"
            className="bg-primary dark:text-background rounded-full px-2 py-1 text-xs font-semibold sm:px-3"
          >
            {t('try-now')}
          </Link>
        )}
      </div>

      <div className="hidden items-center gap-x-6 md:flex">
        <Link
          href="/pricing"
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm font-semibold"
        >
          pricing
          {t('pricing')}

        </Link>

        <Link
          href="/blog"
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm font-semibold"
        >
                      {t('blog')}

          
        </Link>

        <Link
          href="https://documenso-app-q0ns.onrender.com/signin"
          target="_blank"
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm font-semibold"
        >
                      {t('sign.in')}

         
        </Link>
      </div>

      <HamburgerMenu
        onToggleMenuOpen={() => setIsHamburgerMenuOpen((v) => !v)}
        isMenuOpen={isHamburgerMenuOpen}
      />
      <MobileNavigation
        isMenuOpen={isHamburgerMenuOpen}
        onMenuOpenChange={setIsHamburgerMenuOpen}
      />
    </header>
  );
};
