import React from 'react';
import { connect } from 'react-redux';

// import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

// import './collection-item.styles.scss';

import {
  CollectionItemDiv,
  Image,
  CollectionFooterDiv,
  NameSpan,
  PriceSpan,
  AddToCartButton,
} from './collection-item.styles';

const CollectionItem = (props) => {
  const { name, price, imageUrl } = props.item;
  return (
    <CollectionItemDiv>
      <Image imageUrl={imageUrl}></Image>

      <CollectionFooterDiv className="collection-footer">
        <NameSpan>{name}</NameSpan>
        <PriceSpan>{price}</PriceSpan>
      </CollectionFooterDiv>

      <AddToCartButton
        className="custom-button"
        onClick={() => props.addItem(props.item)}
        inverted
      >
        Add to cart
      </AddToCartButton>
    </CollectionItemDiv>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
