import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router';

import Spinner from '../../components/spinner/spinner.component';

import { createStructuredSelector } from 'reselect';
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverview = lazy(() =>
  import('../../components/collections-overview/collections-overview.component')
);
const Collection = lazy(() => import('../collection/collection.component'));

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

const ShopPage = ({
  isCollectionFetching,
  fetchCollectionsStart,
  isCollectionsLoaded,
}) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Routes>
        <Route
          path=""
          element={
            <Suspense fallback={<Spinner />}>
              <CollectionsOverviewWithSpinner
                isLoading={isCollectionFetching}
              />
            </Suspense>
          }
        />
        <Route
          path=":categoryId"
          element={
            <Suspense fallback={<Spinner />}>
              <CollectionWithSpinner isLoading={!isCollectionsLoaded} />
            </Suspense>
          }
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
