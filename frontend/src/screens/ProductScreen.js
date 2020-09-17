/*
 * @Author: chen yang
 * @Date: 2020-09-13 13:14:04
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 19:04:41
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { showProductDetails } from "../actions/productActions";

const ProductScreen = () => {
  const { id } = useParams();
  const history = useHistory();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>

      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
              <li>
                Status:{" "}
                {product.countInStock > 0 ? (
                  <span className="green">In Stock</span>
                ) : (
                  "Out of stock."
                )}
              </li>
              <li>
                Qty:{" "}
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button primary">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
