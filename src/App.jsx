import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from './Spinner'
import useFetch from "./services/useFetch.js";

export default function App() {
  const [shoeSize, setShoeSize] = useState('');
  const { data:products, loading, error } = useFetch("products?category=shoes");
 
function renderProduct(p) {
  return (
    <div key={p.id} className="product">
      <a href="/">
        <img src={`/images/${p.image}`} alt={p.name} />
        <h3>{p.name}</h3>
        <p>${p.price}</p>
      </a>
    </div>
  );
}

const filteredProducts = shoeSize ? products.filter(product => product.skus.find(sku => sku.size === parseInt(shoeSize))) :
  products;

if (error) throw error;
if (loading) return <Spinner />
return (
  <>
    <div className="content">
      <Header />
      <main>
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
      </main>
    </div>
    <Footer />
  </>
);
}
