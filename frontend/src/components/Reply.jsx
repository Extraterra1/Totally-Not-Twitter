import Tweet from './Tweet';

const Reply = ({ tweet }) => {
  return (
    <>
      <Tweet $reply tweet={tweet} />
    </>
  );
};

export default Reply;
