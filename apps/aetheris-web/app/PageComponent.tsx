"use client";
import { client } from "./TrpcProvider";

export default function PageComponent(): JSX.Element {
    const health = client.health.health.useQuery();

    if (health.status === "loading") {
        return <div>Loading...</div>;
    }
    if (health.status === "error") {
        return <div>Error: {health.error.message}</div>;
    }
    if (!health.data) {
        return <div>Unknown error</div>;
    }

    return (
        <div>
            <h1>Aetheris API is {health.data.status}</h1>
        </div>
    );
}
