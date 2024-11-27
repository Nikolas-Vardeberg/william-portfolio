import { groq } from "next-sanity";
import { POST_QUERY } from "./post.queries";
import { RICH_TEXT_QUERY } from "../rich-text.queries";
import { IMAGE_QUERY } from "../image.queries";



export const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0] {
    title,
    entry[] ${RICH_TEXT_QUERY},
    mainImage ${IMAGE_QUERY},
    "project": projects[] -> ${POST_QUERY},
}`