import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

import TTNLogo from '../assets/ttn-logo.png';

const Timeline = () => {
  return (
    <>
      <Wrapper>
        <SidebarContainer>
          <div className="sidebar">
            <div className="logo">
              <img src={TTNLogo} alt="TTN Logo" />
            </div>
            <div className="item"></div>
          </div>
        </SidebarContainer>
      </Wrapper>
    </>
  );
};

export default Timeline;

const Wrapper = styled.main`
  background-color: var(--black);

  display: grid;
  grid-template-columns: 5fr 3fr 5fr;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;

  & > .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
    min-width: 30rem;

    color: var(--light);

    & > .logo {
      max-width: 10rem;

      & > img {
        max-width: inherit;
      }
    }
  }
`;
