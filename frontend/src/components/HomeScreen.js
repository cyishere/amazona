/*
 * @Author: chen yang
 * @Date: 2020-09-13 13:14:01
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 13:26:54
 */
import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = ({ data }) => {
  return (
    <ul className="products">
      {data.products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={`/product/${product._id}`}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <div className="product-name">{product.name}</div>
            </Link>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">
              {product.rating} Stars ({product.numReviews} Reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HomeScreen;
