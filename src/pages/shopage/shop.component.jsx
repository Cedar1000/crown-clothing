import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { isCollectionFetching } = this.props;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path=""
            element={
              <CollectionsOverviewWithSpinner
                isLoading={isCollectionFetching}
              />
            }
          />
          <Route
            path=":categoryId"
            element={<CollectionWithSpinner isLoading={isCollectionFetching} />}
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
