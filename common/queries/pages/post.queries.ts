import { groq } from "next-sanity"
import { IMAGE_QUERY } from "../image.queries"


export const POST_QUERY = groq`{
    title,
    "slug": slug.current,
    mainImage ${IMAGE_QUERY},
    publishedAt,
}`


export const POST_BY_SLUG_QUERY = groq``