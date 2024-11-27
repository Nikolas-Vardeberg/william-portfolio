import { groq } from "next-sanity";
import { IMAGE_QUERY } from "./image.queries";

export const RICH_TEXT_QUERY = groq`{
    ...,
    _type,
    _type == "image" => ${IMAGE_QUERY},
    "markDefs": select(
        count(markDefs) > 0 => markDefs[]{
            ...,
        },
        [],
    ),
}`

export const SIMPLE_RICH_TEXT_BLOCK_QUERY = groq`{
    _type,
    text[] ${RICH_TEXT_QUERY}
}`;