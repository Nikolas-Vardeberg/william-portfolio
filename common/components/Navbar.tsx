import Link from "next/link";



export default function Navbar() {
    return(
        <div className="flex flex-wrap justify-between items-center gap-x-5 px-4 py-4 lg:px-5 border-b">
            <Link href="/" className="h-full text-xl hover:text-slate-200 text-white md:text-2xl">
                William
            </Link>
            
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <Link href="/om-meg" className="text-lg px-3 py-1 text-white border-secondary border rounded hover:text-black hover:bg-white md:text-2xl">
                    ↗ Om Meg
                </Link>
                <Link href="/prosjekter" className="text-lg px-3 py-1 text-white border-secondary border rounded hover:text-black hover:bg-white md:text-2xl">
                    ↗ Prosjekter
                </Link>
            </div>
        </div>
    )
}