import React, { useState } from "react";
import Spinner from './Spinner'
import useFetch from "./services/useFetch.js";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound.jsx";
import { Link } from "react-router-dom";

export default function Products() {
    const [shoeSize, setShoeSize] = useState('');
    const { category } = useParams();
    const { data: products, loading, error } = useFetch(
        "products?category=" + category
    );

    function renderProduct(p) {
        return (
            <div key={p.id} className="product">
                <Link to={`/${category}/${p.id}`}>
                    <img src={`/images/${p.image}`} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                </Link>
            </div>
        );
    }

    const filteredProducts = shoeSize ? products.filter(product => product.skus.find(sku => sku.size === parseInt(shoeSize))) :
        products;

    if (error) throw error;
    if (loading) return <Spinner />
    if (products.length === 0) return <PageNotFound />;
    return (
        <>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}
                <select
                    id="size"
                    value={shoeSize}
                    onChange={(e) => setShoeSize(e.target.value)}
                >
                    <option value="">All sizes</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                {shoeSize && <h2>found {filteredProducts.length} items </h2>}
            </section>
            <section id='products'>
                {filteredProducts.map(renderProduct)}
            </section>
        </>
    );
}
