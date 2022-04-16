import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../preview-collection/collection-preview.component';

import './collections-overview.styles.scss';

import { CollectionsOverviewDiv } from './collections-overview.styles';

const collectionsOverview = ({ collections }) => (
  <CollectionsOverviewDiv>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewDiv>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(collectionsOverview);
