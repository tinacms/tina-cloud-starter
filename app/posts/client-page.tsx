'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { BsArrowRight } from 'react-icons/bs';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostConnectionQuery, PostConnectionQueryVariables } from '@/tina/__generated__/types';
import { mermaid } from '@/components/blocks/mermaid';
import ErrorBoundary from '@/components/error-boundary';

interface ClientPostProps {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}

export default function PostsClientPage(props: ClientPostProps) {
  return (
    <ErrorBoundary>
      {props.data?.postConnection.edges!.map((postData) => {
        const post = postData!.node!;
        const date = new Date(post.date!);
        let formattedDate = '';
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, 'MMM dd, yyyy');
        }
        return (
          <Link
            key={post.id}
            href={`/posts/` + post._sys.breadcrumbs.join('/')}
            className='group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 bg-gray-50 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-1000 rounded-md shadow-xs transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-800'
          >
            <h3
              className={"text-gray-700 dark:text-white text-3xl lg:text-4xl font-semibold title-font mb-5 transition-all duration-150 ease-out"}
            >
              {post.title}{' '}
              <span className='inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out'>
                <BsArrowRight className='inline-block h-8 -mt-1 ml-1 w-auto opacity-70' />
              </span>
            </h3>
            <div className='prose dark:prose-dark w-full max-w-none mb-5 opacity-70'>
              <TinaMarkdown
                content={post.excerpt}
                components={{
                  mermaid,
                }}
              />
            </div>
            <div className='flex items-center'>
              {post!.author && post!.author.avatar && (
                <div className='shrink-0 mr-2'>
                  <Image
                    width={500}
                    height={500}
                    className='h-10 w-10 object-cover rounded-full shadow-xs'
                    src={post?.author?.avatar}
                    alt={post?.author?.name}
                  />
                </div>
              )}
              <p className='text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white'>
                {post?.author?.name}
              </p>
              {formattedDate !== '' && (
                <>
                  <span className='font-bold text-gray-200 dark:text-gray-500 mx-2'>—</span>
                  <p className='text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150'>{formattedDate}</p>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </ErrorBoundary>
  );
}
