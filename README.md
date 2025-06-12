# Tina CMS Cloud Starter based Internationalized Site

- [App Router setup with i18n routing – Internationalization \(i18n\) for Next.js](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- Follow the 8 steps in the article adapted to the existing Tina CMS code

### Install next-intl

```
pnpm install next-intl
```

### 1. messages/en.json and de.json

- translations for the NotFound page

```json
{
  "NotFound": {
    "title": "Seite nicht gefunden",
    "description": "Verloren, diese Seite ist. In einem anderen System könnte sie sein.",
    "link": "Zurück zur Startseite"
  }
}
```

### 2. next.config.ts

#### decouple TinaCMS config from Next.js config dependency to prevent errors during TinaCMS build

- Hardcode basePath as empty string (was always defaulting to this anyway)
- Enable next-intl plugin wrapper in next.config.ts without compatibility issues

**next.config.ts**

```ts
import createNextIntlPlugin from 'next-intl/plugin';
...
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

- Remove next.config import from tina/config.tsx to resolve import conflicts
  Hardcode basePath as empty string **tina/config.tsx**

```ts
...
outputFolder: "admin", // within the public folder
basePath: "", // Hardcoded - was always empty anyway! Changed due to error with next-intl.
```

### Reorganize all pages and blog posts under app/[locale]

```ts
app / [locale] / layout.tsx;
app / [locale] / page.tsx;
app / [locale] / not - found.tsx;

app / [locale] / [...urlSegments] / page.tsx;
app / [locale] / [...urlSegments] / client - page.tsx;

app / [locale] / posts / page.tsx;
app / [locale] / posts / client - page.tsx;
app / [locale] / posts / [...urlSegments] / client - page.tsx;
app / [locale] / posts / [...urlSegments] / page.tsx;
```

### Add internationalization middleware and routing configuration

### 3. i18n/routing.ts

- no changes
- To share the configuration between navigation and middleware
- Created routing configuration to define supported locales and default locale.

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de"],

  // Used when no locale matches
  defaultLocale: "en",
});
```

### 4. i18n/navigation.ts

- no changes
- Added navigation utilities to facilitate locale-aware navigation.

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

### 5. middleware.ts

- Introduced middleware for handling internationalization using next-intl.
  In **middleware.ts** add admin:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)

  // - … `/admin` paths (for Tina CMS)
  matcher: "/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)",
};
```

### 6. i18n/request.ts

- no changes
- used to provide messages based on the user’s locale
- Implemented request configuration to manage locale and message loading based on user requests.

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### 7. app/[locale]/layout.tsx

- Updated RootLayout to validate incoming locale

```ts
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
...

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <VideoDialog />
        </VideoDialogProvider>
```

### Implement internationalization support for home and about pages, as well as not found page

- Modified Home and Page components to support locale-specific content retrieval with fallback mechanisms.

### 8. support locale-specific content retrieval

**app/[locale]/page.tsx**

```ts
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Try locale-specific home first, fallback to generic home
  let data;
  try {
    data = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });
  } catch (error) {
    // Fallback to non-locale specific home
    try {
      data = await client.queries.page({
        relativePath: `home.mdx`,
      });
    } catch (fallbackError) {
      throw error; // Re-throw original error
    }
  }
```

**app/[locale]/not-found.tsx**

- Enhanced NotFound component to utilize translations for dynamic content.

```ts
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
...
export default function NotFound() {
  const t = useTranslations("NotFound");
...
<h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
        {t("description")}
      </p>
      <div className="mt-10 mx-auto">
        <Button asChild>
        <Link href="/">{t("link")}</Link>

```

### app/[locale]/[...urlSegments]/page.tsx

- Integrated locale handling in URL segments.

```ts
import { hasLocale } from 'next-intl';Add commentMore actions
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
...
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}) {
  const { locale, urlSegments } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const filepath = urlSegments.join('/');

  let data;
  try {
    // Try locale-specific content first
    data = await client.queries.page({
      relativePath: `${locale}/${filepath}.mdx`,
    });
  } catch (error) {
    // Fallback to non-locale specific content
    try {
      data = await client.queries.page({
        relativePath: `${filepath}.mdx`,
      });
    } catch (fallbackError) {
      notFound();
    }
```

### Moved/translated text from content/pages/ to en/ and de/

**content/pages/en/home.mdx**
**content/pages/en/about.mdx**
**content/pages/de/home.mdx**
**content/pages/de/about.mdx**

```yaml
---
blocks:
... (translated content)
```

### Moved/translated text from posts/ to en/ and de/

- Internationalized example blog posts

```ts
content / posts / de / june / learning - about - tinacloud.mdx;
content / posts / de / learning - about - components.mdx;
content / posts / de / learning - about - markdown.mdx;
content / posts / de / learning - about - mermaid.mdx;
content / posts / de / learning - about - tinacms.mdx;
content / posts / de / learning - to - blog.mdx;

content / posts / en / june / learning - about - tinacloud.mdx;
content / posts / en / learning - about - components.mdx;
content / posts / en / learning - about - markdown.mdx;
content / posts / en / learning - about - mermaid.mdx;
content / posts / en / learning - about - tinacms.mdx;
content / posts / en / learning - to - blog.mdx;
```

### Implement server-side locale filtering for blog posts

- Add server-side filtering in posts page to show only locale-specific content
- Filter posts by checking first breadcrumb segment against current locale
- Update individual post page to handle locale parameter properly

### Posts list: app/[locale]/posts/page.tsx

- Filter posts list by locale

```ts
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
...
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
...
```

### app/[locale]/posts/client-page.tsx

Added `breadcrumbsWithoutLocale` to prevent duplicate locale in route: domain/de/posts/de/article

```ts
...
      formattedDate = format(date, 'MMM dd, yyyy');
    }
    const breadcrumbsWithoutLocale = post._sys.breadcrumbs.slice(1);
...
      tags: post.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/posts/${breadcrumbsWithoutLocale.join('/')}`,
...
```

### Individual posts: app/[locale]/posts/[...urlSegments]/page.tsx

- filepath with locale before article name: `content/posts/de/learning-to-blog.mdx`

```ts
...
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
...
  params: Promise<{ locale: string; urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const { locale, urlSegments } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const filepath = `${locale}/${urlSegments.join('/')}`;

  let data;
  try {
    data = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }
...
  urlSegments: edge?.node?._sys.breadcrumbs.slice(1),
```

### Add internationalization support to Layout component with menu items sourced from global/index.json

- first move and translate files into `content/global/de/index.json` and `content/global/en/index.json`

### components/layout/layout.tsx

- Import getLocale from next-intl/server to detect current locale
- Implement try-catch pattern to load locale-specific global content first
- Add fallback to non-locale specific content for backward compatibility

```ts
...
import { getLocale } from 'next-intl/server';
...
 // Get the current localeAdd commentMore actions
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
    } catch (fallbackError) {
      throw error; // Re-throw original error
    }
  }

  return (
    <LayoutProvider
...
```

### content/global/de/index.json

- translated from content/global/en/index.json

```json
    "nav": [
      {
        "href": "/",
        "label": "Hauptseite"
      },
      {
        "href": "/about",
        "label": "Über Uns"
      },
      {
        "href": "/posts",
        "label": "Das Blog"
      }
    ]
```

### Add a Locale Switcher

- Add language switcher with flag icons (🇩🇪/🇺🇸) before site name
- Place language switcher and site name at bottom of mobile menu
- Integrate with existing next-intl setup
- Example site: https://next-intl-example-app-router.vercel.app
- Based on https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/

**components/layout/nav/LocaleSwitcher.tsx**

```ts
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
```

**components/layout/nav/LocaleSwitcherSelect.tsx**

```ts
"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label className="relative text-sm text-muted-foreground">
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-2 pl-2 pr-6 outline-none cursor-pointer"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
```

**components/layout/nav/header.tsx**

```ts
import LocaleSwitcher from "./LocaleSwitcher";
...
  {/* Right side: Language Switcher + Site Name */}
  <div className="hidden lg:flex items-center gap-4 h-full">
    <LocaleSwitcher />
    <span className="text-sm font-medium text-muted-foreground">
      |
    </span>
    <span className="text-sm font-medium">
      {header.name}
    </span>
  </div>
...
  {/* Mobile Language Switcher & Site Name */}
  <div className="flex items-center justify-between pt-4 border-t">
    <LocaleSwitcher />
    <span className="text-sm font-medium">
      {header.name}
    </span>
  </div>
```

**messages/de.json**

```
  "LocaleSwitcher": {
    "label": "Sprache ändern",
    "locale": "{locale, select, de {🇩🇪 Deutsch} en {🇺🇸 English} other {Unknown}}"
  },
```

**messages/en.json**

```
  "LocaleSwitcher": {
    "label": "Change language",
    "locale": "{locale, select, de {🇩🇪 Deutsch} en {🇺🇸 English} other {Unknown}}"
  },
```

## Update React 18.3 → 19.1

Theoretically this should work without issues:
- https://tina.io/blog/react-19-support

### 1. Update TinaCMS first

```
pnpm add tinacms@latest @tinacms/cli@latest
```

### 2. Update React and related packages

```
pnpm add react@latest react-dom@latest @types/react@latest @types/react-dom@latest
```

- This causes numerous dependency warnings, for example:

```
 WARN  Issues with peer dependencies found
├─┬ tinacms 2.7.8
│ └─┬ @tinacms/mdx 1.6.3
│   ├─┬ @tinacms/schema-tools 1.7.4
│   │ └── ✕ unmet peer yup@^0.32.0: found 1.6.1
│   └─┬ typedoc 0.26.11
│     └── ✕ unmet peer typescript@5.6.3: found 5.8.3
├─┬ @tinacms/cli 1.9.8
│ └─┬ @tinacms/metrics 1.0.9
│   └── ✕ unmet peer fs-extra@^9.0.1: found 11.3.0
└─┬ next-intl 4.1.0
  └── ✕ unmet peer typescript@5.6.3: found 5.8.3
```

### 3. Add the pnpm configuration

- To override dependency versions and ignore React version warnings
- Add this to `pnpm-workspace.yaml`:

```yaml
  #"yup": "0.32.11"
  "yup": "1.6.1"
  #"fs-extra": "9.1.0"
  "fs-extra": "11.3.0"
  "typescript": "5.8.3"

peerDependencyRules:
  allowedVersions:
    react: "19"
    react-dom: "19"
```

### 4. Add these to package.json

Pin to the latest versions

```
json{
  "dependencies": {
    "yup": "^1.6.1",
    "fs-extra": "^11.3.0",
  }
}
```

Alternatively pin to the old versions

```
json{
  "dependencies": {
    "yup": "0.32.11",
    "fs-extra": "9.1.0",
  }
}
```

### 4. Clean install

```sh
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Note

Some packages apparently required the older versions previously,
therefore running these with the newer versions will need more testing.

Moving typescript from 5.6.3 to 5.8.3 is only a minor version increase,
and is least likely to cause issues.

---

---

# Tina Starter 🦙

![tina-cloud-starter-demo](https://user-images.githubusercontent.com/103008/130587027-995ccc45-a852-4f90-b658-13e8e0517339.gif)

This Next.js starter is powered by [TinaCMS](https://app.tina.io) for you and your team to visually live edit the structured content of your website. ✨

The content is managed through Markdown and JSON files stored in your GitHub repository, and queried through Tina GraphQL API.

### Features

- [Tina Headless CMS](https://app.tina.io) for authentication, content modeling, visual editing and team management.
- [Vercel](https://vercel.com) deployment to visually edit your site from the `/admin` route.
- Local development workflow from the filesystem with a local GraqhQL server.

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), pnpm installed for local development.
- A [TinaCMS](https://app.tina.io) account for live editing.

## Local Development

Install the project's dependencies:

> [!NOTE]  
> [Do you know the best package manager for Node.js?](https://www.ssw.com.au/rules/best-package-manager-for-node/) Using the right package manager can greatly enhance your development workflow. We recommend using pnpm for its speed and efficient handling of dependencies. Learn more about why pnpm might be the best choice for your projects by checking out this rule from SSW.

```sh
pnpm install
```

Run the project locally:

```sh
pnpm dev
```

### Local URLs

- http://localhost:3000 : browse the website
- http://localhost:3000/admin : connect to Tina Cloud and go in edit mode
- http://localhost:3000/exit-admin : log out of Tina Cloud
- http://localhost:4001/altair/ : GraphQL playground to test queries and browse the API documentation

## Deployment

### GitHub Pages

This starter can be deployed to GitHub Pages. A GitHub Actions workflow is included that handles the build and deployment process.

To deploy to GitHub Pages:

1. In your repository settings, ensure GitHub Pages is enabled and set to deploy from the `gh-pages` branch
2. Push changes to your main branch - the workflow will automatically build and deploy the site

> [!NOTE]
> When deploying to GitHub Pages, you'll need to update your secrets in Settings | Secrets and variables | Actions to include:
>
> - `NEXT_PUBLIC_TINA_CLIENT_ID`
> - `TINA_TOKEN`
>
> You get these from your TinaCloud project - [read the docs](https://tina.io/docs/tina-cloud/deployment-options/github-pages)

> [!IMPORTANT]
> GitHub Pages does not support server side code, so this will run as a static site. If you don't want to deploy to GitHub pages, just delete `.github/workflows/build-and-deploy.yml`

### Building the Starter Locally (Using the hosted content API)

Replace the `.env.example`, with `.env`

```
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the project you create at app.tina.io>
TINA_TOKEN=<get this from the project you create at app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<Specify the branch with Tina configured>
```

Build the project:

```bash
pnpm build
```

## Getting Help

To get help with any TinaCMS challenges you may have:

- Visit the [documentation](https://tina.io/docs/) to learn about Tina.
- [Join our Discord](https://discord.gg/zumN63Ybpf) to share feedback.
- Visit the [community forum](https://community.tinacms.org/) to ask questions.
- Get support through the chat widget on the TinaCMS Dashboard
- [Email us](mailto:support@tina.io) to schedule a call with our team and share more about your context and what you're trying to achieve.
- [Search or open an issue](https://github.com/tinacms/tinacms/issues) if something is not working.
- Reach out on Twitter at [@tina_cms](https://twitter.com/tina_cms).

## Development tips

### Visual Studio Code GraphQL extension

[Install the GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) to benefit from type auto-completion.

### Typescript

A good way to ensure your components match the shape of your data is to leverage the auto-generated TypeScript types.
These are rebuilt when your `tina` config changes.

## LICENSE

Licensed under the [Apache 2.0 license](./LICENSE).
