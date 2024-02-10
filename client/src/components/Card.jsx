import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !==[]) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty });
       return
      } else if (food.size !== size) {
        await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        return
      }
      return
    }  
      await dispatch({ type: 'ADD', id: foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: '18rem' }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="Card Image"
          style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100 fs-6">
            <select className="m-2 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {' '}
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="d-inline fs-5">{qty * parseInt(options[size])}/-</div>
          </div>
          <hr></hr>
          <button className="btn btn-success justify-content-center ms-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
