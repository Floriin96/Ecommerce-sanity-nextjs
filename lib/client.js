import sanityClienbt from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClienbt({
    projectId: 'sil1fzy6',
    dataset: 'production',
    apiVersion: '2022-12-01',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
