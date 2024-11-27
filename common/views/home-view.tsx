import PortableText from "../components/atoms/PortableText";
import { Home } from "../types/root.types";


export default async function HomeView({data}: { data: Home }) {
    return(
        <div>
            <PortableText value={data.entry} />
            <pre>
                {JSON.stringify(data, undefined, 2)}
            </pre>
        </div>
    )
}