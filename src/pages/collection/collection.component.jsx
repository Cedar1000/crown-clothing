import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { useParams } from 'react-router-dom';

import { firestore } from '../../firebase/firebase.utils';

import './collection.styles.scss';

const CollectionPage = () => {
  useEffect(() => {
    console.log('I am subscribing');

    const unsubscribeFromCollections = firestore
      .collection('collections')
      .onSnapshot((snaphot) => console.log(snaphot));

    return () => {
      console.log('I am unsubscribing');
      unsubscribeFromCollections();
    };
  }, []);

  const { categoryId } = useParams();

  const { title, items } = useSelector(selectCollection(categoryId));

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
