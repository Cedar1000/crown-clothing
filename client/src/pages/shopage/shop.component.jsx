import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router';

import { createStructuredSelector } from 'reselect';
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

const ShopPage = ({
  isCollectionFetching,
  fetchCollectionsStart,
  isCollectionsLoaded,
}) => {
  useEffect(() => {
    console.log('I am mounted');
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Routes>
        <Route
          path=""
          element={
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />
          }
        />
        <Route
          path=":categoryId"
          element={<CollectionWithSpinner isLoading={!isCollectionsLoaded} />}
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);