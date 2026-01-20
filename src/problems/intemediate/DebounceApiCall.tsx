import { useEffect, useRef, useState } from "react";

const DebounceApiCall = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const timeoutRef = useRef(null);

    useEffect(() => {
        console.log(timeoutRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            getProductsApi(query);
        }, 1000);
    }, [query]);

    function getProductsApi(query: string) {
        fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then((res) => res.json())
            .then((res) => setProducts(res.products));
    }

    function debounce(cb, delay) {
        let timer;
        return function (args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(args);
            }, delay);
        };
    }

    function handleChange(e) {
        console.log(e);
    }

    const handleDebounceChange = debounce(handleChange, 3000);

    return (
        <div>
            <h1>DebounceApiCall</h1>
            <input
                className="border"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {products.map((product: any) => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default DebounceApiCall;
