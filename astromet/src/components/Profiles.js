import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #778899;
  padding: 10px 15px;
  border-radius: 25px;
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
    height: 400px;
    width: 400px;
    border-radius: 20px;
    object-fit: cover;
    margin: 10px 0;
    box-shadow: 0px 0px 5px 8px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ActionButton = styled.button`
    height: 30px;
    width: 120px;
    border-radius: 15px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
`;

const NameContainer = styled.span`
    font-size: 18pt;
`;

const EmptyProfiles = styled.div`
    height: 550px;
    display: flex;
    align-items: center;
    font-size: 18pt;
`;

const ResetButton = styled.button`
    height: 30px;
    width: 120px;
    margin-top: 16px;
    border-radius: 15px;
`;
function Profiles() {

    const [profilesList, setProfile] = useState({});

    const getProfile = () => {
        axios
            .get(
                "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/brunoluan/person"
            )
            .then(response => {
                setProfile(response.data.profile)
            })
            .catch(error => { console.log(error.message) })
    }

    useEffect(() => {
        document.title = 'Astromatch';
        getProfile();
    }, [])

    const like = () => {
        const body = {
            id: profilesList.id,
            choice: true,
        };
        axios
            .post(
                "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/brunoluan/choose-person",
                body
            )
            .then((response) => {
                if (response.data.isMatch) {
                    alert("Vocês deram match! Mande uma mensagem para seu novo crush!")
                }
                getProfile();
            })
            .catch((error) => { console.log(error); });
    };

    const dislike = () => {
        const body = {
            id: profilesList.id,
            choice: false,
        };
        axios
            .post(
                "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/brunoluan/choose-person",
                body
            )
            .then((response) => {
                getProfile();
            })
            .catch((error) => { console.log(error); });
    };

    const resetApp = () => {
        axios
            .put(
                "https://us-central1-missao-newton.cloudfunctions.net/astroMatch/brunoluan/clear",
            )
            .then((response) => {
                alert("Aplicativo resetado!")
            })
            .catch((error) => { console.log(error); });
    };

    if (profilesList !== null) {
        return (
            <AppContainer>
                <MapContainer>
                    <NameContainer>{profilesList.name}</NameContainer>
                    <ProfileImg src={profilesList.photo} alt={profilesList.name}></ProfileImg>
                    <InfoContainer>
                        <span>{profilesList.bio}</span>
                        <span>{profilesList.age} anos</span>
                    </InfoContainer>
                </MapContainer>
                <ButtonContainer>
                    <ActionButton onClick={dislike}>NÃO CURTI</ActionButton>
                    <ActionButton onClick={like}>CURTI</ActionButton>
                </ButtonContainer>
                <ResetButton onClick={resetApp}>RESET</ResetButton>
            </AppContainer>
        );
    }
    else if (profilesList === null) {
        return (
            <AppContainer>
                <EmptyProfiles>
                    PARECE QUE NÃO HÁ MAIS PESSOAS NA SUA REGIÃO!
                </EmptyProfiles>
                <ResetButton onClick={resetApp}>RESET</ResetButton>
            </AppContainer>
        )
    }

}

export default Profiles;