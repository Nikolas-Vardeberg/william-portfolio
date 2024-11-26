import { HOMEPAGE_QUERY } from "@/common/queries/pages/homepage.queries"
import HomeView from "@/common/views/home-view";
import { sanityFetch } from "@/sanity/lib/live"


const getData = async() => {
  const data = await sanityFetch({
    query: HOMEPAGE_QUERY
  });

  return data;
}

export default async function HomePage() {
  const data = await getData();

  return(
    <HomeView data={data.data} />
  )
}