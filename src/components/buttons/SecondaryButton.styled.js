import styled from "styled-components";
import {Button} from 'antd';

const SecondaryButton = styled(Button)`
  font-size: 28px;
  height: 100%;
  color: black;
  background-color: white;
  border-color: black;
  max-width: 300px;
  margin: 0 20px;

  :hover, ::selection {
    border-color: #383733;
    color: black;
  }
  :focus {
    background-color: #c3c3c3;
    color: inherit;
    border-color: inherit;
  }
`;

export default SecondaryButton;
