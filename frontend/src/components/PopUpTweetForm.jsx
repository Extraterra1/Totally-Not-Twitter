import Modal from './Modal';

const PopUpTweetForm = ({ setIsOpen, isOpen }) => {
  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
      <h1>POST TWEET</h1>
    </Modal>
  );
};

export default PopUpTweetForm;
