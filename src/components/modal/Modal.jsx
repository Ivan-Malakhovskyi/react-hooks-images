import { useState } from 'react';
import ReactModal from 'react-modal';
import { Backdrop } from './backDropModal';

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setModalIsOpen(true)}>
        Open Modal
      </button>
      <Backdrop>
        <ReactModal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <h3>Yello</h3>
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, et!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, et!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, et!
            </li>
          </ul>
        </ReactModal>
      </Backdrop>
    </div>
  );
};
