import React from 'react';
import ProductsCard from './ProductCard';

const Product = () => {
  return (
    <main>
      <section className="product-page">
        <h2 className="page-title">Our Products</h2>
        <ProductsCard />
      </section>
    </main>
  );
};

export default Product;
