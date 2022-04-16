import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemsFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

import {
  CheckoutItemDiv,
  ImageContainer,
  Image,
  NameSpan,
  QuantityContainer,
  ValueDiv,
  ArrowDiv,
  PriceSpan,
  RemoveButtonDiv,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemDiv>
      <ImageContainer>
        <Image src={imageUrl} alt="item" />
      </ImageContainer>

      <NameSpan>{name}</NameSpan>

      <QuantityContainer>
        <ArrowDiv onClick={() => removeItem(cartItem)}>&#10094;</ArrowDiv>
        <ValueDiv>{quantity}</ValueDiv>
        <ArrowDiv onClick={() => addItem(cartItem)}>&#10095;</ArrowDiv>
      </QuantityContainer>

      <PriceSpan>{price}</PriceSpan>

      <RemoveButtonDiv onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonDiv>
    </CheckoutItemDiv>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemsFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
