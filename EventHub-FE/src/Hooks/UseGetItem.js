import { useState } from "react";

export default function useGetItem(key, init) {
    const [results] = useState(
        JSON.parse(localStorage.getItem(key) || init)
    );

    return results;
}