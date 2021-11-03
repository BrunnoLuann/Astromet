import React, { useState } from 'react';
import styled from 'styled-components';
import Profiles from './components/Profiles.js'
import Matches from './components/Matches.js'
import Header from './components/Header.js'


const PageContainer = styled.div`
  width: 30vw;
  margin: 0 auto;
  font-family: Arial;
`;

function App() {
  const [pageValue, setPageValue] = useState("profiles")

  const goProfiles = () => {
    setPageValue("profiles")
  }
  const goMatches = () => {
    setPageValue("matches")
  }
  if (pageValue === "profiles") {
    return (
      <div>
        <Header

          changePage={goMatches}
          pageName="MATCHES"
        />
        <Profiles />
      </div>
    )
  }
  else if (pageValue === "matches") {
    return (
      <div>
        <Header
          changePage={goProfiles}
          pageName="PERFIS"
        />
        <Matches />
      </div>

    )
  }
}

export default App;
