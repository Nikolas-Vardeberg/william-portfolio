import { defineType } from "sanity";
import { image } from "../objects/image.schema";



export const homepage = defineType({
    name: "homepage",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel",
            type: "string",
        },
        {
            name: "entry",
            title: "Innhold",
            type: "simpleRichText",
        },
        image({
            name: "mainImage",
            title: "Hovedbildet",
        }),
        {
            name: "projects",
            title: "Prosjekter",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "post"}]
                }
            ]
        }
    ]
})