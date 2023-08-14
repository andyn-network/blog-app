import { useState, useEffect } from "react";

// Custom hook for fetching data from a given URL
const useFetch = (url) => {
    // State variables to store data, loading status, and errors
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // useEffect hook to fetch data when the component mounts or the URL changes
    useEffect(() => {
        // Create an instance of AbortController to handle aborting the fetch
        const abortCont = new AbortController();

        // Delayed fetch using setTimeout to simulate loading
        setTimeout(() => {
            // Fetch data from the provided URL using the AbortController signal
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    // Check if the response is not okay, then throw an error
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json(); // Parse response data as JSON
                })
                .then((data) => {
                    // Update state with fetched data and set loading and error states
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        // Update loading state and set the error message
                        setIsPending(false);
                        setError(err.message);
                    }
                });
        }, 200); // Simulated delay

        // Cleanup function to abort the fetch if the component unmounts or URL changes
        return () => abortCont.abort();
    }, [url]); // Dependency array, re-run effect if the URL changes

    // Return the data, loading status, and error for the component using this hook
    return { data, isPending, error };
};

export default useFetch; // Export the custom hook for use in other components
