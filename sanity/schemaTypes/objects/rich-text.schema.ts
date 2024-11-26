import { type ArrayOfType, defineField, defineType } from 'sanity';
import { Columns2, Link, SquareArrowOutUpRight, SquareSplitHorizontal, Text } from 'lucide-react';
import { image } from './image.schema';
import { LI } from '@/common/components/atoms/icon';

export const getDefaultBlockSetup = ({
    headingLevels = [],
    lists = false,
    annotations,
}: {
    headingLevels?: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>;
    lists?: boolean;
    annotations?: ArrayOfType<'object' | 'reference', undefined>[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}): Array<any> => {
    return [
        {
			type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
              ],
            marks: {
				decorators: [
					{ title: 'Fet', value: 'strong' },
					{ title: 'Kursiv', value: 'em' },
				],
				annotations: annotations ?? [],
			},
            lists: lists
				? [
						{ title: 'Nummerert liste', value: 'number' },
						{ title: 'Punktliste', value: 'bullet' },
					]
				: [],
        }
    ]
}

/*export const internalLink = defineField({
	name: 'internalLink',
	type: 'object',
	title: 'Intern lenke',
	icon: LI(Link),
	fields: [
		{ 
			name: 'reference',
			type: 'reference',
			title: 'Reference',
			validation: (R) => R.required(),
            to: [{ type: 'article' }, { type: 'transportPage' }, { type: 'infoPage' }],
		},
	],
});*/

export const externalLink = defineField({
	name: 'externalLink',
	type: 'object',
	title: 'Ekstern lenke',
	icon: LI(SquareArrowOutUpRight),
	fields: [
		{
			name: 'href',
			type: 'url',
			title: 'URL',
			validation: (R) => [
				R.uri({
					scheme: ['https', 'mailto', 'tel'],
				}).error('URL must be a valid URL'),
			],
			options: {
				aiAssist: { exclude: true },
			},
		},
		{
			title: 'Åpne i ny fane',
			name: 'blank',
			type: 'boolean',
			initialValue: false,
			options: {
				aiAssist: { exclude: true },
			},
		},
	],
});


export const simpleRichText = defineType({
	name: 'simpleRichText',
	type: 'array',
	// @ts-ignore
	icon: LI(Text),
	of: [...getDefaultBlockSetup({})],
});


export const richText = defineType({
	name: 'richText',
	type: 'array',
	icon: LI(Text),
	of: [
		...getDefaultBlockSetup({
			headingLevels: ['h1', 'h2', 'h3', 'h4', 'h5'],
			lists: true,
			annotations: [externalLink],
		}),
		image({
			aspect: true,
			includeWidthOptions: true,
		}),
	],
});

export const imageAndTextBlock = defineField({
	type: 'object',
	title: 'Bilde og tekst blokk',
	name: 'imageAndTextBlock',
	// @ts-ignore
	icon: LI(SquareSplitHorizontal),
	fields: [
		image({
			aspect: true,
		}),
		{
			name: 'text',
			type: 'simpleRichText',
			title: 'Text',
		},
		{
			name: 'imageWidth',
			type: 'string',
			initialValue: '1/2',
			title: 'Bilde bredde',
			options: {
				list: ['1/2', '1/3'],
				aiAssist: {
					exclude: true,
				},
			},
		},
	],
});