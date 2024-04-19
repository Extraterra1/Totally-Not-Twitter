import styled from 'styled-components';

const SmallPrint = () => {
  return (
    <Container>
      <span>About</span>
      <span>Download the TNT App</span>
      <span>Help Center</span>
      <span>Terms of Service</span>
      <span>Privacy Policy</span>
      <span>Cookie Policy</span>
      <span>Accesibility</span>
      <span>Ads Info</span>
      <span>Blog</span>
      <span>Careers</span>
      <span>Brand Resources</span>
      <span>Advertising</span>
      <span>Marketing</span>
      <span>TNT for Business</span>
      <span>Developers</span>
      <span>Directory</span>
      <span>Settings</span>
      <span>© 2024 TNT Corp.</span>
    </Container>
  );
};

export default SmallPrint;

const Container = styled.div`
  display: flex;
  grid-column: span 2;

  gap: 1.5rem;
  justify-content: center;
  padding: 1rem;
  color: #71767b;

  & > span:not(:last-child):hover {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }

  @media screen and (max-width: 1300px) {
    flex-wrap: wrap;
  }
`;
