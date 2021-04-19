import { useRouter } from 'next/router';
import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
const domain = SITE_URL.split('://')[1];
const defaultTitle = '#ENDSARS Archived';
const defaultDescription =
  'Share your story about police brutality in Nigeria. Help keep documentation by sharing your photos or videos';
const defaultSeparator = ' | ';

const buildHref = (pathname) => `${SITE_URL}${pathname}`;
const buildPageTitle = (title) =>
  title ? title + defaultSeparator + defaultTitle : defaultTitle;
const setMetaTitle = (title) => buildPageTitle(title).substring(0, 100);
const setDescription = (description) =>
  description ? description.substring(0, 200) : defaultDescription;

const generateMeta = (
  { title, description, image, contentType, noCrawl },
  pathname
) => {
  const metaTitle = setMetaTitle(title);
  const metaDescription = setDescription(description);
  const metaImage = image || `${SITE_URL}/banner.jpg`;

  const metaTags = [
    { itemProp: 'name', content: metaTitle },
    { itemProp: 'description', content: metaDescription },
    { itemProp: 'image', content: metaImage },
    { name: 'description', content: metaDescription },
    { property: 'og:title', content: metaTitle },
    { property: 'og:type', content: contentType || 'website' },
    { property: 'og:url', content: SITE_URL + pathname },
    { property: 'og:locale', content: 'en' },
    { property: 'og:card', content: 'summary' },
    { property: 'og:creator', content: defaultTitle },
    { property: 'og:image', content: metaImage },
    { property: 'og:description', content: metaDescription },
    { property: 'og:site_name', content: defaultTitle },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:domain', content: domain },
    { property: 'twitter:url', content: SITE_URL + pathname },
    { property: 'twitter:title', content: metaTitle },
    { property: 'twitter:description', content: metaDescription },
    { property: 'twitter:image', content: metaImage }
  ];

  if (noCrawl) {
    metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
  } else {
    metaTags.push({ name: 'robots', content: 'index, follow' });
  }

  return metaTags;
};

const Meta = ({ title, description, image, contentType, noCrawl }) => {
  const { asPath } = useRouter();
  const metas = generateMeta(
    {
      title,
      description,
      image,
      contentType,
      noCrawl
    },
    asPath
  );
  return (
    <Head>
      <title>{buildPageTitle(title)}</title>
      <link rel="canonical" href={buildHref(asPath)} />
      {metas.map((meta, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <meta key={i} {...meta} />
      ))}
    </Head>
  );
};

export default Meta;
