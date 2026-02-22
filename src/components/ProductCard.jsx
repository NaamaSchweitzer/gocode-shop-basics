import { useNavigate } from "react-router";
import { ShopContext } from "../ShopContext";
import { useContext } from "react";

export const ProductCard = (props) => {
  const { cart, handleAddProd, handleRemoveProd } = useContext(ShopContext);

  const navigate = useNavigate();

  const amount = cart.find((item) => item._id === props._id)?.amount || 0;

  const handleImageClick = () => {
    navigate(`/products/${props._id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image" onClick={handleImageClick}>
        <img src={props.img} />
      </div>
      <div className="product-amount">
        <button
          onClick={() => handleRemoveProd(props._id)}
          disabled={amount === 0}
        >
          -
        </button>
        <input value={amount} type="text" readOnly />
        <button onClick={() => handleAddProd(props._id)}>+</button>
      </div>
      <div className="product-info">
        <h5>{props.itemName}</h5>
        <h6>${props.price}</h6>
      </div>
    </div>
  );
};
