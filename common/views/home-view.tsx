import PortableText from "../components/atoms/PortableText";
import { Home } from "../types/root.types";


export default async function HomeView({data}: { data: Home }) {
    return(
        <div>
            <div className="prose prose-xl">
                <PortableText value={data.entry} />
            </div>
            
            <pre>
                {JSON.stringify(data, undefined, 2)}
            </pre>
        </div>
    )
}