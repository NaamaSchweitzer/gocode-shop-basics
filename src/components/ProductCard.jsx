import { useNavigate } from "react-router";
import { ShopContext } from "../ShopContext";

export const ProductCard = (props) => {
  const { img, itemName, price, amount, onAdd, onRemove, productId } = props;
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-card">
      {/* <button onClick={handleImageClick }> */}
      <div className="product-image" onClick={handleImageClick}>
        <img src={img} />
      </div>
      {/* </button> */}
      <div className="product-amount">
        <button onClick={onRemove}>-</button>
        <input value={amount} type="text" readOnly />
        <button onClick={onAdd}>+</button>
      </div>
      <div className="product-info">
        <h5>{itemName}</h5>
        <h6>{price + "$"}</h6>
      </div>
    </div>
  );
};
