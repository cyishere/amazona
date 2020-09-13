/*
 * @Author: chen yang
 * @Date: 2020-09-13 13:14:04
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 15:42:52
 */
import React from "react";
import { useParams, Link } from "react-router-dom";

const ProductScreen = ({ products }) => {
  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>

      <div className="details">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <strong>{product.price}</strong>
            </li>
            <li>
              Description: <div>{product.description}</div>
            </li>
          </ul>
        </div>

        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Qty:{" "}
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </li>
            <li>
              <button className="button primary">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
