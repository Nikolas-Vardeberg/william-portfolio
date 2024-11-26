import { LI } from '@/common/components/atoms/icon';
import { DoorOpen } from 'lucide-react';
import { defineField } from 'sanity';

export const transportBlockVariantOptions = [
	{ title: 'Vanlig', value: 'default' },
	{ title: 'Stor horizontal', value: 'lh' },
	{ title: 'Liten horizontal', value: 'sh' },
];

export const transportBlocks = defineField({
    name: 'transportBlocks',
    title: 'Transport Blokker',
	icon: LI(DoorOpen),
    type: 'object',
    fields: [
		{
			name: 'variant',
			type: 'string',
			title: 'Type',
			options: {
				list: transportBlockVariantOptions,
				aiAssist: { exclude: true },
			},
			initialValue: 'default',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'flipHorizontal',
			title: 'Flipp horisontalt',
			type: 'boolean',
			hidden: ({ parent }) => parent?.variant !== 'lh',
			options: {
				aiAssist: { exclude: true },
			},
		},
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
		},
       
        {
            name: 'pages',
			title: 'Sider',
			type: 'array',
			of: [
                {
                    title: 'Vanlig sidereferanse',
					type: 'reference',
					to: [
                        { type: 'homepage'}, //TODO: LEGG TIL FLERE SIDER
					],
					validation: (Rule) => Rule.required(),
                }
            ]
        },
        {
			name: 'options',
			title: 'Innstillinger',
			type: 'object',
			fields: [
				{
					name: 'hideLabel',
					title: 'Skjul label',
					type: 'boolean',
					initialValue: false,
					options: {
						aiAssist: { exclude: true },
					},
				},
				{
					name: 'hideTags',
					title: 'Skjul tags',
					type: 'boolean',
					initialValue: false,
					options: {
						aiAssist: { exclude: true },
					},
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
				aiAssist: { exclude: true },
			},
		},
    ]
})