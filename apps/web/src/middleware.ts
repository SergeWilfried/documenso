import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    const redirectUrl = new URL('/en/signin', req.url);

    return NextResponse.redirect(redirectUrl);
  }

  if (req.nextUrl.pathname.startsWith('/en/signin')) {
    const token = await getToken({ req });

    if (token) {
      const redirectUrl = new URL('/en/documents', req.url);

      return NextResponse.redirect(redirectUrl);
    }
  }

  // const pathnameIsMissingLocale = locales.every(
  //   (locale) =>
  //     !req.nextUrl.pathname.startsWith(`/${locale}/`) && req.nextUrl.pathname !== `/${locale}`,
  // );

  // if (pathnameIsMissingLocale) {
  //   // We are on the default locale
  //   // Rewrite so Next.js understands
  //   console.warn(`missing locale`, fallbackLng);

  //   // e.g. incoming request is /about
  //   // Tell Next.js it should pretend it's /en/about
  //   return NextResponse.rewrite(new URL(`/${fallbackLng}${req.nextUrl.pathname}`, req.url));
  // }
  return NextResponse.next();
}
