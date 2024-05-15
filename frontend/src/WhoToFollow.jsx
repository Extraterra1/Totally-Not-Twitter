import styled from 'styled-components';

const WhoToFollow = () => {
  return (
    <Container>
      <h4 className="title">Who to follow</h4>
    </Container>
  );
};

export default WhoToFollow;

const Container = styled.div`
  border: 1px solid var(--gray-dark);
  border-radius: 2rem;
  width: 100%;
  padding: 1rem;

  & > h4.title {
    color: var(--light);
    font-size: 1.8rem;
  }
`;
