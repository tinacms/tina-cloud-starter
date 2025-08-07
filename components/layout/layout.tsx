import React, { PropsWithChildren } from 'react';
import { LayoutProvider } from './layout-context';
import client from '../../tina/__generated__/client';
import { Header } from './nav/header';
import { Footer } from './nav/footer';
import { getLocale } from 'next-intl/server';

type LayoutProps = PropsWithChildren & {
  rawPageData?: object;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  if (!rawPageData) {
    // Handle missing rawPageData case
    return null;
  }

  // Get the current locale
  const locale = await getLocale();

  let globalData;
  try {
    // Try locale-specific global content first
    globalData = await client.queries.global(
      {
        relativePath: `${locale}/index.json`,
      },
      {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      }
    );
  } catch (error) {
    // Fallback to non-locale specific content
    try {
      globalData = await client.queries.global(
        {
          relativePath: 'index.json',
        },
        {
          fetchOptions: {
            next: {
              revalidate: 60,
            },
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (fallbackError) {
      throw error; // Re-throw original error
    }
  }

  return (
    <LayoutProvider
      globalSettings={globalData.data.global}
      pageData={rawPageData}
    >
      <Header />
      <main className="overflow-x-hidden pt-20">{children}</main>
      <Footer />
    </LayoutProvider>
  );
}
