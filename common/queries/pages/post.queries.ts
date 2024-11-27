import { groq } from "next-sanity"
import { IMAGE_QUERY } from "../image.queries"
import { RICH_TEXT_QUERY, SIMPLE_RICH_TEXT_BLOCK_QUERY } from "../rich-text.queries"


export const POST_QUERY = groq`{
    title,
    "slug": slug.current,
    mainImage ${IMAGE_QUERY},
    publishedAt,
}`



export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    entry[] ${SIMPLE_RICH_TEXT_BLOCK_QUERY},
    mainImage ${IMAGE_QUERY},
    content[] ${RICH_TEXT_QUERY},
}`