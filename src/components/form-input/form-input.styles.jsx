import styled, { css } from 'styled-components';

const sub_color = 'grey';
const main__color = 'black';

const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
  color: ${main__color};
`;

export const GroupDiv = styled.div`
  position: relative;
  margin: 45px 0;
`;

const inputStyles = css`
  background: none;
  background-color: white;
  color: ${sub_color};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${sub_color};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    ${shrinkLabel}
  }
`;

export const TextInput = styled.input`
  ${inputStyles}
`;

export const PasswordInput = styled.input`
  ${inputStyles}
  letter-spacing: 0.3em;
`;
