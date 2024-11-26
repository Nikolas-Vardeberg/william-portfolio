import { defineType } from "sanity";
import { image } from "../objects/image.schema";
import { blockArea } from "../objects/blocks.schema";
import { secondarySlugs, slug } from "../objects/slug.schema";
import { teaserGroup } from "../objects/teaser.schema";

export const postCategories = [
	{
		title: 'Ingen',
		value: 'none',
	},
	{
		title: 'Software Development',
		value: 'Software',
	},
	{
		title: 'Large Language Models',
		value: 'llm',
	},
	{
		title: 'Web Development',
		value: 'webdev',
	},
];

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
            name: "teaser",
            title: "Teaser",
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
        {
            name: "entry",
            type: "simpleRichText",
            title: "Ingress",
            group: "general",
        },
        {
			name: 'publishedAt',
			type: 'datetime',
			title: 'Publisert',
			group: 'general',
			description: 'Dato for publisering av prosjekt',
			initialValue: new Date().toISOString(),
			validation: (Rule) => Rule.required(),
		},
        {
            name: "category",
            type: "string",
            title: "Kategori",
            group: "general",
            options: {
                list: postCategories,
                layout: 'radio',
            },
            initialValue: "none",
            validation: (rule) => rule.required(),
        },
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
        blockArea({
            group: "general"
        }),
        ...teaserGroup,
        secondarySlugs({ group: "seo"})
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