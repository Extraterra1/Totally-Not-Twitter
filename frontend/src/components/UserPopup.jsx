import styled from 'styled-components';

const UserPopup = ({ user }) => {
  return (
    <>
      <Wrapper>
        <h1>I'm {user.username}</h1>
      </Wrapper>
    </>
  );
};

export default UserPopup;

const Wrapper = styled.div`
  background-color: cyan;

  height: 100%;
  width: 100%;
`;
