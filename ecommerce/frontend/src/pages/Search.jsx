import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";



const Search = () => {
    const [params] = useSearchParams();
    const query = params.get("q") || "";
    const pageParam = Number(params.get("page")) || 1;



    const [data, setData] = useState([]);
    const [page, setPage] = useState(pageParam);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSearch = async () => {
            const res = await api.get("/products/search", {
                params: { q: query, page, limit: 8 },
            });

            setData(res.data.products);
            setTotalPages(res.data.totalPages);
        };

        fetchSearch();
    }, [query, page]);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-serif mb-10">
                Résultats pour : <span className="italic">{query || "tout"}</span>
            </h1>

            {data.length === 0 ? (
                <p className="text-gray-500">Aucun résultat trouvé.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {data.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-center gap-4 mt-16">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-4 py-2 rounded-full border ${page === i + 1
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default Search;
