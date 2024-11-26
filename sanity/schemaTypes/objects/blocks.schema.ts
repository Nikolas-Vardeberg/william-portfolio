import { defineField } from "sanity";
import { image } from "./image.schema";
import { transportBlocks } from "./transport.schema";



export const blocks = ({
    ...props
}: {
    group?: string;
    validation?: any;
}) =>
    defineField({
        name: "blocks",
        type: "array",
        title: "Blokker",
        description: "Innholdsblokker",
        of: [
            transportBlocks,
            image({
                aspect: true
            }),
        ],
        ...props
    });

export const blockArea = ({group, title = 'Blokkområde'} = {} as { group?: string; title?: string}) =>
    defineField({
        name: 'blockArea',
		type: 'array',
		title,
		description: 'Innholdsblokker',
		of: [
            image({
                aspect: true,
            }),
            transportBlocks,
        ],
        group,
    });