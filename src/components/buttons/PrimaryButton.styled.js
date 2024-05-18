import styled from "styled-components";
import {Button} from 'antd';

const PrimaryButton = styled(Button)`
  font-size: 28px;
  height: 100%;
  color: white;
  background-color: grey;
  border-color: black;
  max-width: 300px;
  margin: 0 20px;

  :hover, ::selection {
    background-color: #0d152e;
    border-color: black;
    color: #bababa;
  }
  :focus {
    background-color: #301511;
    border-color: black;
    color: #bababa;
  }
`;

export default PrimaryButton;
