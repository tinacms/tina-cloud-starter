'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostConnectionQuery, PostConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { ArrowRight, UserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ClientPostProps {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}

export default function PostsClientPage(props: ClientPostProps) {
  const posts = props.data?.postConnection.edges!.map((postData) => {
    const post = postData!.node!;
    const date = new Date(post.date!);
    let formattedDate = '';
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, 'MMM dd, yyyy');
    }

    return {
      id: post.id,
      published: formattedDate,
      title: post.title,
      tags: post.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/posts/${post._sys.breadcrumbs.join('/')}`,
      excerpt: post.excerpt,
      heroImg: post.heroImg,
      author: {
        name: post.author?.name || 'Anonymous',
        avatar: post.author?.avatar,
      }
    }
  });

  return (
    <ErrorBoundary>
      <Section>
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="mx-auto mb-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl">
              Blog Posts
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.
            </p>
          </div>

          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <Link
                        href={post.url}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      <TinaMarkdown content={post.excerpt} />
                    </div>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <Avatar>
                        {post.author.avatar && (
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-8 w-8"
                          />
                        )}
                        <AvatarFallback>
                          <UserRound size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{post.author.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {post.published}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link
                        href={post.url}
                        className="inline-flex items-center font-semibold hover:underline md:text-base"
                      >
                        <span>Read more</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  {post.heroImg && (
                    <div className="order-first sm:order-last sm:col-span-5">
                      <Link href={post.url} className="block">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                          <Image
                            width={533}
                            height={300}
                            src={post.heroImg}
                            alt={post.title}
                            className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
