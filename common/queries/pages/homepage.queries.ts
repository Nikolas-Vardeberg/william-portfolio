import { groq } from "next-sanity";



export const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0] {
    ...,
}`