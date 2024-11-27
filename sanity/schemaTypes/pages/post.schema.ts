import { defineType } from "sanity";
import { image } from "../objects/image.schema";
import { slug } from "../objects/slug.schema";

export const post = defineType({
    name: "post",
    type: "document",
    title: "Prosjekter",
    groups: [
        {
            name: "general",
            title: "General",
            default: true,
        },
        {
            name: "byline",
            title: "Byline"
        },
    ],
    fields: [
        {
            name: "title",
            type: "string",
            title: "Tittel",
            group: "general"
        },
        slug(undefined, {
            group: "general",
        }),
        image({
			name: 'mainImage',
			group: 'general',
			title: 'Hovedbilde',
			description: 'Hovedbilde for artikkelen',
		}),
        {
			name: 'content',
			type: 'richText',
			title: 'Content',
			group: 'general',
		},
    ],
    orderings: [
		{
			title: 'Publiseringsdato (nyeste først)',
			name: 'publishDateDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
		{
			title: 'Publiseringsdato (eldste først)',
			name: 'publishDateAsc',
			by: [{ field: 'publishedAt', direction: 'asc' }],
		},
		{
			title: 'Tittel (A-Å)',
			name: 'titleAsc',
			by: [{ field: 'title', direction: 'asc' }],
		},
		{
			title: 'Tittel (Å-A)',
			name: 'titleDesc',
			by: [{ field: 'title', direction: 'desc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			publishedAt: 'publishedAt',
			mainImage: 'mainImage',
			teaser: 'teaserImage',
		},
		prepare({ title, publishedAt, mainImage, teaser }) {
			return {
				title,
				subtitle: new Date(publishedAt).toLocaleDateString(),
				media: mainImage || teaser,
			};
		},
	},
})