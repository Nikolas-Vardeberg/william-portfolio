import { Image } from "sanity";




export type Page = any[];

export type SanityBlockContent = any[];

export type SanityRichtTextType = any[];

export type Home = {
    title: string;
    entry: SanityRichtTextType;
    mainImage: WilliamImage;
}

export type Nullable<T> = T | null;


export type WilliamImage = {
	data?: {
		altText?: Nullable<string>;
		description?: Nullable<string>;
	};
	description?: string;
	altTextOverride?: string;
	aspect?: 'auto' | '1:1' | '16:9' | '4:3';
	width?: number;
	lqip: string;
	_type: 'image';
} & Image;