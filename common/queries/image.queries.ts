import { groq } from 'next-sanity';

export const IMAGE_QUERY = groq`{
    ...,
    "data": asset->{altText, description},
    "lqip": @.asset->metadata.lqip,
    "_type": "image"
}`;