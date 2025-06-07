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

  // Filter posts by locale based on the breadcrumbs (first segment is the locale)
  const filteredEdges = allPosts.data.postConnection.edges.filter((edge) => {
    // Check if the first breadcrumb matches the current locale
    return edge?.node?._sys.breadcrumbs[0] === locale;
  });

  // Create a filtered version of the posts data
  const filteredPosts = {
    ...allPosts,
    data: {
      ...allPosts.data,
      postConnection: {
        ...allPosts.data.postConnection,
        edges: filteredEdges,
      },
    },
  };

  return (
    <Layout rawPageData={filteredPosts.data}>
      <PostsClientPage {...filteredPosts} />
    </Layout>
  );
}
