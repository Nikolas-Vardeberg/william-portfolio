import { urlFor } from "@/sanity/lib/image";
import SanityImage from "../components/atoms/SanityImage";
import { Post } from "../types/root.types";
import PortableText from "../components/atoms/PortableText";


export default async function PostView({ data }: { data: Post}) {
    return(
        <div className="container bg-white mx-auto my-10 flex py-10 flex-col gap-8 rounded-3xl overflow-hidden">
            <h1 className="text-5xl text-black">{data.title}</h1>
            <div>
            <SanityImage
                image={data.mainImage}
                height={500}
                width={500}
                className="h-full w-full"
            />
            </div>

            <div className="prose prose-xl">
                <PortableText value={data.content} />
            </div>
        </div>
    )
}