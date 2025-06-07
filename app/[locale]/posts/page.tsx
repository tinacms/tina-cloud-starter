import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import PostsClientPage from './client-page';

import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  let posts = await client.queries.postConnection({
    sort: 'date',
    last: 1,
  });
  const allPosts = posts;

  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.postConnection({
      sort: 'date',
      before: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) {
      break;
    }

    allPosts.data.postConnection.edges.push(
      ...posts.data.postConnection.edges.reverse()
    );
  }

  // Filter posts client side to only include those from the current locale
  // TODO: This is a temporary solution to filter posts client side.
  // We should find a better solution to filter posts server side.
  const filteredPosts = {
    ...allPosts,
    data: {
      ...allPosts.data,
      postConnection: {
        ...allPosts.data.postConnection,
        edges:
          allPosts.data.postConnection.edges?.filter((edge) =>
            edge?.node?._sys.relativePath.startsWith(`${locale}/`)
          ) || null,
        totalCount:
          allPosts.data.postConnection.edges?.filter((edge) =>
            edge?.node?._sys.relativePath.startsWith(`${locale}/`)
          ).length || 0,
      },
    },
  };

  return (
    <Layout rawPageData={filteredPosts.data}>
      <PostsClientPage {...filteredPosts} />
    </Layout>
  );
}
