import React from 'react';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { useParams } from 'react-router-dom';

// import './collection.styles.scss';
import {
  CollectionContainer,
  TitleHeader,
  ItemsDiv,
} from './collections.styles';

const CollectionPage = () => {
  const { categoryId } = useParams();

  const { title, items } = useSelector(selectCollection(categoryId));

  return (
    <CollectionContainer>
      <TitleHeader>{title}</TitleHeader>
      <ItemsDiv>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ItemsDiv>
    </CollectionContainer>
  );
};

export default CollectionPage;
