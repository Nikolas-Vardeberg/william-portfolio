"use client"

import { PortableText as NativePortableText } from '@portabletext/react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { SanityBlockContent, SanityRichtTextType } from '@/common/types/root.types';

type SimplePortableTextProps = {
    id?: string;
    blocks: SanityRichtTextType;
}

export default function PortableText({ value }: { value: SanityBlockContent }) {
    return(
        <NativePortableText 
            value={value}
            components={{
				marks: {
					externalLink: ({ children, value }) => {
						if (!value || typeof value.href !== 'string') {
							console.warn('Inncorrect rendering of (external)', value.href);
							return <span id="incorrect-link-rendering">{children}</span>
						} 
						return (
							<Link
								className='underline hover:no-underline focus-visible:border focus-visible:border-dashed inline-flex items-center'
								href={value.href}
								{...(value.blank && { target: '_blank', rel: 'noopener noreferrer' })}
							>
								{children}
								<ExternalLink className='inline-block size-4 ml-1 font-bold' />
							</Link>
						)
					}
				},
            }}
        />
    )
}

export const PortableTextSimple = ({ blocks }: SimplePortableTextProps) => <NativePortableText value={blocks} />;