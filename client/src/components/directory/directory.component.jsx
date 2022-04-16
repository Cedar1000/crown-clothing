import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directrory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import { DirectoryMenuDiv } from './directory.styles';

const Directory = ({ sections }) => (
  <DirectoryMenuDiv>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuDiv>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
