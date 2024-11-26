import { apiVersion } from '@/sanity/env';
import { type SanityDocument, groq } from 'next-sanity';
import { defineField } from 'sanity';
import SITE_CONFIG from '../../../config.william';
import { Page } from '@/common/types/root.types';

const RESERVED_SLUGS = ['api'];
const MAX_CARACTER = 155;

export const slug = (
	refField = 'title',
	options?: {
		group?: string;
	},
) =>
	defineField({
		type: 'slug',
		name: 'slug',
		title: 'Slug',
		description:
			'Brukes som unik identifikator i url. Kan kun inneholde bokstaver, tall, understrek og bindestrek.',
		options: {
			source: refField,
			maxLength: MAX_CARACTER,
			isUnique: async (slug, context) => {
				// Search for all documents with the same slug
				const query = groq`*[_type == $type && !(_id in path("drafts.**")) && locale == $locale && slug.current == $slug]{_id, title }`;

				const documents = await context.getClient({ apiVersion }).fetch<Page[]>(query, {
					slug,
					type: context.document?._type,
					locale: context.document?.locale ?? SITE_CONFIG.i18n.fallbackLanguage,
				});

				// Returns true if no documents are found, false otherwise
				return documents.length <= 1;
			},
		},
		validation: (Rule) => [
			Rule.required(),
			Rule.custom((value) => {
				const slug = value?.current as string;
				const slugRegex = new RegExp(/^[a-z0-9]+(?:[-_]+[a-z0-9]+)*$/);

				if (!slug) return 'Slug kan ikke være tom.';

				if (RESERVED_SLUGS.includes(slug))
					return `Slug kan ikke være lik "${slug}" da dette er en reservert url.`;

				if (slug.length > MAX_CARACTER) {
					return `Slug kan ikke være lengre enn ${MAX_CARACTER} tegn.`;
				}

				return slugRegex.test(slug)
					? true
					: 'Slug kan kun inneholde små bokstaver, tall, understrek og bindestrek.';
			}),
		],
		...options,
	});

export const secondarySlugs = ({ group }: { group?: string } = {}) =>
	defineField({
		name: 'secondarySlugs',
		type: 'array',
		title: 'Alternative slugs',
		description: 'Legg til alternative slugs for artikkelen',
		of: [{ type: 'slug' }],
		group: group,
		validation: (R) =>
			R.custom(async (value, context) => {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const v = value as any as { current: string }[] | undefined;

				if (!v) return true;

				const slugs = v.map((s) => s.current);
				const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
				if (duplicates.length > 0) {
					return `Duplikat slug: ${duplicates.join(', ')}`;
				}

				if (RESERVED_SLUGS.some((s) => slugs.includes(s))) {
					return `En eller flere av slugene er reservert: ${RESERVED_SLUGS.join(', ')}`;
				}

				// only allow lowercase letters, numbers, hyphen and underscore
				const reg = /^[a-z0-9]+(?:[-_]+[a-z0-9]+)*$/;

				const invalid = slugs.filter((s) => !reg.test(s));

				if (invalid.length > 0) {
					return `En eller flere av slugene inneholder ugyldige tegn: ${invalid.join(', ')}`;
				}

				const client = context.getClient({ apiVersion: '2024-01-15' });
				const query = '*[_type == $type && (slug.current in $slugs || secondarySlugs[].current in $slugs)]';
				const params = { slugs, type: context.document?._type };

				const docs = await client.fetch(query, params);
				if (docs.length > 1) {
					return `En eller flere av slugene er allerede i bruk: ${docs.map((d: SanityDocument) => d.title).join(', ')}`;
				}

				return true;
			}),
	});