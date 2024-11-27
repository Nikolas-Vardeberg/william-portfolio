import { POST_BY_SLUG_QUERY } from "@/common/queries/pages/post.queries"
import PostView from "@/common/views/post-view";
import { sanityFetch } from "@/sanity/lib/live"
import { notFound } from "next/navigation";


type PageProps = {
    params: Promise<{ slug: string }>;
}

const getData = async(slug: string) => {
    const data = await sanityFetch({
        query: POST_BY_SLUG_QUERY,
        params: { slug }
    });

    return data;
}

export default async function PostPage(props: PageProps) {
    const params = await props.params;
    const slug = params.slug;

    const data = await getData(slug);

    if (!data || !data.data) return notFound();

    return(
        <PostView data={data.data} />
    )
}