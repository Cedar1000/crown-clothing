import styled, { css } from 'styled-components';

const genericStyles = css`
  width: 23%;
`;

export const CheckoutItemDiv = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const NameSpan = styled.span`
  ${genericStyles}
`;

export const QuantityContainer = styled.div`
  display: flex;
  ${genericStyles}
`;

export const ArrowDiv = styled.div`
  cursor: pointer;
`;

export const ValueDiv = styled.div`
  margin: 0 10px;
`;

export const PriceSpan = styled.span`
  ${genericStyles}
`;

export const RemoveButtonDiv = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
