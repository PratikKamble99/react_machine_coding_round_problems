import useResilientFetch from "./useResilientFetch";

const ApiRetry = () => {
    const { data, loading, error } = useResilientFetch(
        `https://jsonplaceholder.typicode.com/useras/1`,
        {}, // options
        { retries: 3, baseDelay: 500 }, // custom config
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{data?.name}</h1>
            <p>{data?.email}</p>
        </div>
    );
};

export default ApiRetry;
