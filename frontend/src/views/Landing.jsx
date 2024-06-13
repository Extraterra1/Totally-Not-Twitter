import styled from 'styled-components';
import TNTLogo from '../assets/ttn-logo.png';
import { useState, useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Navigate, useSearchParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { Toaster, toast } from 'react-hot-toast';

import Modal from '../components/Modal';
import Actions from '../components/Actions';
import SmallPrint from '../components/SmallPrint';
import Register from '../components/Register';
import Login from '../components/Login';

const Landing = () => {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const openLoginModal = () => setLoginModalIsOpen(true);

  const isAuthenticated = useIsAuthenticated();
  const [searchParams, setSearchParams] = useSearchParams();
  const signIn = useSignIn();

  const [, executeGithubLogin] = useAxios({ url: import.meta.env.VITE_API_URL + '/githubLogin', method: 'POST' }, { manual: true, autoCancel: true });

  useEffect(() => {
    const login = async () => {
      try {
        const code = searchParams.get('code');
        if (code) {
          const res = await toast.promise(
            executeGithubLogin({ data: { code } }),
            {
              loading: 'Logging in with GitHub...',
              success: 'Logged in! Redirecting...',
              error: 'Something went wrong'
            },
            { id: 'login' }
          );
          signIn({ auth: { token: res.data.token, type: 'Bearer' }, userState: res.data.user });
        }
      } catch (err) {
        console.log(err);
      }
    };
    login();
  }, []);

  return (
    <>
      {isAuthenticated && <Navigate to="/timeline" />}
      <Modal isOpen={registerModalIsOpen} setIsOpen={setRegisterModalIsOpen} shouldCloseOnOverlayClick={false}>
        <Register />
      </Modal>
      <Modal isOpen={loginModalIsOpen} setIsOpen={setLoginModalIsOpen} shouldCloseOnOverlayClick={false}>
        <Login openRegisterModal={openRegisterModal} />
      </Modal>
      <Wrapper>
        <div className="logo-container">
          <img src={TNTLogo} alt="TNT Logo" />
        </div>
        <Actions openRegisterModal={openRegisterModal} openLoginModal={openLoginModal} />
        <SmallPrint />
      </Wrapper>
      <Toaster position="top-center" />
    </>
  );
};

export default Landing;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;

  align-items: center;

  background-color: var(--black);
  color: var(--light);

  & .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      max-width: 30vw;
    }

    @media screen and (max-width: 800px) {
      grid-column: span 2;
      justify-self: start;
      margin-left: 2rem;
      margin-top: 2rem;

      & img {
        max-width: 15vw;
      }
    }
  }

  @media screen and (max-width: 800px) {
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
`;
