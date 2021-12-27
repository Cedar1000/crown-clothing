import React from 'react';

// import './menu-item.styles.scss';

import {
  MenuItemDiv,
  BackgroundImage,
  ContentDiv,
  TitleHeader,
  SubtitleSpan,
} from './menu-item.styles';

import { useNavigate } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  const navigate = useNavigate();
  return (
    <MenuItemDiv size={size} onClick={() => navigate(`${linkUrl}`)}>
      <BackgroundImage className="background-image" imageUrl={imageUrl} />
      <ContentDiv className="content">
        <TitleHeader>{title.toUpperCase()}</TitleHeader>
        <SubtitleSpan>SHOP NOW</SubtitleSpan>
      </ContentDiv>
    </MenuItemDiv>
  );
};

export default MenuItem;
