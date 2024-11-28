import type { ReactNode } from 'react';
import '../studio.css';

export const metadata = {
	title: "William studio",
	description: "William studio",
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <body>{children}</body>;
}