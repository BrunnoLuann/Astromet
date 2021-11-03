import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 8px 0 25px 0;
    align-items: center;
`;
const TitleContainer = styled.span`
    background-color: blue;
    padding: 12px 22px;
    border-radius: 8px;
    font-size: 18pt;
    font-weight: bold;
    border-radius: 15px;
`;
const PageButton = styled.button`
    height: 30px;
    width: 120px;
    font-size: 12pt;
    border-radius: 15px;
`;

function Header(props) {
    return (
        <HeaderContainer>
            <TitleContainer>ASTROMATCH</TitleContainer>
            <PageButton onClick={props.changePage}>{props.pageName}</PageButton>
        </HeaderContainer>
    )
}

export default Header;