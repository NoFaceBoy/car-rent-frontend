import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  padding: 20px 0px;
  justify-content: space-around;
  width: 100%;
  align-items: center;

  h2 {
    margin: 0;
    color: white;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 60px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;

  Button {
    margin: 5px;
    width: 100px;
  }

  .ant-btn-primary {
    background-color: grey;
    border-color: black;
  }
  .ant-btn-primary:hover, ::selection {
    background-color: #2b2c2f;
    border-color: black;
  }
  .ant-btn-primary:focus {
    background-color: #201f1f;
    border-color: #383733;
  }

  .ant-btn-default {
    border-color: black;
  }
  .ant-btn-default:hover, ::selection {
    border-color: #383733;
    color: black;
  }
  .ant-btn-default:focus {
    background-color: #c3c3c3;
    color: inherit;
  }
`;

export const Essentials = styled.div`
  display: flex;
  align-items: center;
`;
