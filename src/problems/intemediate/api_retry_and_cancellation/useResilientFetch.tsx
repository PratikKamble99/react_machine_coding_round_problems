import { useState, useEffect, useRef } from "react";

const useResilientFetch = (
    url: string,
    options = {},
    { retries = 3, baseDelay = 1000 } = {},
) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // We use a ref to store the timeout ID so we can clear it if the component unmounts
    const retryTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // 1. Create a new AbortController for this specific effect run
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async (attempt = 0) => {
            setLoading(true);

            try {
                // Pass the signal to the fetch call
                const response = await fetch(url, { ...options, signal });

                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);

                const json = await response.json();

                // Only update state if the component hasn't been aborted
                if (!signal.aborted) {
                    setData(json);
                    setError(null);
                    setLoading(false);
                }
            } catch (err: any) {
                // 2. Handle Aborts explicitly: Do nothing if the user cancelled
                if (err.name === "AbortError") {
                    console.log("Request cancelled cleanly.");
                    return;
                }

                // 3. Retry Logic
                if (attempt < retries && !signal.aborted) {
                    // Exponential Backoff: 1000ms, 2000ms, 4000ms...
                    const delay = baseDelay * 2 ** attempt;
                    console.log(
                        `Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`,
                    );

                    // 4. Set a timeout for the next attempt, saving the ID to the ref
                    retryTimeoutRef.current = setTimeout(() => {
                        fetchData(attempt + 1);
                    }, delay);
                } else if (!signal.aborted) {
                    // No more retries left, set the error
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // 5. Cleanup Function: Runs on unmount or if url/options change
        return () => {
            controller.abort(); // Kill active network requests
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current); // Kill pending retry timers
            }
        };
    }, [url, JSON.stringify(options)]); // Re-run if URL or options change

    return { data, error, loading };
};

export default useResilientFetch;
