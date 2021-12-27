import styled, { css } from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const CollectionItemDiv = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover {
    .image {
      opacity: 0.8;
    }

    .custom-button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

const getImageUrl = ({ imageUrl }) => {
  return css`
    background: url(${imageUrl}) no-repeat;
  `;
};

export const Image = styled.div`
  width: 100%;
  height: 95%;

  ${getImageUrl}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 5px;
`;

export const CollectionFooterDiv = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const NameSpan = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const PriceSpan = styled.span`
  width: 10%;
`;

export const AddToCartButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;
