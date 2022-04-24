import React from 'react';

// import './cart-item.styles.scss';

import {
  CartItemDiv,
  Image,
  ItemsDetailsDiv,
  NameSpan,
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemDiv>
    <Image src={imageUrl} alt="item" />
    <ItemsDetailsDiv>
      <NameSpan>{name}</NameSpan>
      <span className="price">
        {quantity} x ${price}
      </span>
    </ItemsDetailsDiv>
  </CartItemDiv>
);

export default React.memo(CartItem);
