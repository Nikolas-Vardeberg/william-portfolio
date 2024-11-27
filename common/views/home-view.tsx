import Link from "next/link";
import PortableText from "../components/atoms/PortableText";
import { Home } from "../types/root.types";
import SanityImage from "../components/atoms/SanityImage";


export default async function HomeView({data}: { data: Home }) {
    return(
        <div className="container flex mx-auto flex-col gap-y-12 my-10 bg-white">

                <div className="w-full">
                    <SanityImage 
                        image={data.mainImage}
                        height={1300}
                        width={1300}
                        className="w-full h-full"
                    />
                </div>

                <div className="prose-xl prose">
                    <PortableText value={data.entry} />
                </div>

                <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
                    {data.project?.map((project, k) => {
                        return(
                            <Link
                                key={k}
                                href={`/prosjekter/${project.slug}`}
                            >
                                <div className="flex flex-col gap-x-5">
                                    <div className="w-full">
                                        <SanityImage 
                                            image={project.mainImage}
                                            height={500}
                                            width={500}
                                            className="w-full aspect-[16/9] border-2 border-black"
                                        />
                                    </div>
                                    <div className="flex text-black flex-wrap justify-between mt-2 w-full text-lg md:text-3xl">
                                        {project.title}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            
        </div>
    )
}