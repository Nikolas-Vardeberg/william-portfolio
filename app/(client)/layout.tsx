import Navbar from '@/common/components/Navbar';
import React from 'react'

export default async function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <>
            <Navbar />
            {children}
        </>
    )
}