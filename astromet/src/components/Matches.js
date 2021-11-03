import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: LightGray;
  padding: 10px 15px;
  border-radius: 25px;
`;

const EmptyProfiles = styled.div`
    height: 550px;
    display: flex;
    align-items: center;
    font-size: 18pt;
`;

const MatchesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: start;
    width: 100%;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: whitesmoke;
    width: 100%;
    margin: 4px 0;
    border-radius: 10px;
`;

const PhotoContainer = styled.div`
    margin: 8px 24px;
`

const MatchPhoto = styled.img`
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
`

const NameAndAgeContainer = styled.div`
`
const NameContainer = styled.div`
    font-weight: bold;
    `

const AgeContainer = styled.div`
`

function Matches() {

    const [matchesList, setMatchesList] = useState([]);

    const getMatches = () => {
        axios
            .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/brunoluan/matches")
            .then((response) => {
                setMatchesList(response.data.matches)
            })
            .catch((error) => { console.log(error) })
    };

    useEffect(() => {
        document.title = 'Astromatch';
        getMatches()
    }, []);

    if (matchesList.length !== 0) {
        return (
            <AppContainer>
                <MatchesContainer>
                    {matchesList.map((user) => {
                        return (
                            <UserContainer>
                                <PhotoContainer>
                                    <MatchPhoto src={user.photo} alt={user.name} />
                                </PhotoContainer>
                                <NameAndAgeContainer>
                                    <NameContainer>{user.name}</NameContainer>
                                    <AgeContainer>{user.age} anos</AgeContainer>
                                </NameAndAgeContainer>
                            </UserContainer>)
                    })}
                </MatchesContainer>
            </AppContainer>
        )
    }
    else if (matchesList.length === 0) {
        return (
            <AppContainer>
                <EmptyProfiles>
                    VOCÊ AINDA NÃO DEU NENHUM MATCH! VOLTE PARA A TELA INÍCIA E COMECE A CURTIR!
                </EmptyProfiles>
            </AppContainer>
        )
    }
}

export default Matches;