import React from "react";
import {Button} from 'antd';
import Logo from "../../../assets/favicon.png";
import {StyledHeader, IconWrapper, ButtonWrapper, Essentials} from "./Header.styled";
import {logOutUser} from "../../../local_storage/localStorageLogic.js";

const Header = () => {
  const loggedUserEmail = localStorage.getItem('loggedUserEmail');

  return (
    <StyledHeader>
      <IconWrapper>
        <img src={Logo} alt="header-logo"/>
        <h2>Car rent</h2>
      </IconWrapper>
      <Essentials>
        <ButtonWrapper>
          {(loggedUserEmail !== 'null')
          ? <Button type="primary" onClick={() => {
            logOutUser();
            window.open('/login', '_self');
          }}>Log out</Button>
          : null}
        </ButtonWrapper>
      </Essentials>
    </StyledHeader>
  );
  };

export default Header;
