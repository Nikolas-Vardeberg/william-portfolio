import { Home } from "../types/root.types";


export default async function HomeView({data}: { data: Home }) {
    return(
        <div>
            <pre>
                {JSON.stringify(data, undefined, 2)}
            </pre>
        </div>
    )
}