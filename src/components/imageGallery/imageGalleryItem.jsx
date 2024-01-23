import Modal from 'react-modal';
import { ImageGalleryItemImage, ImageItem } from './imageGallery.styled';
import { useState } from 'react';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL, tags, id } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <ImageItem
        key={id}
        id={id}
        className="gallery-item"
        onClick={() => setModalIsOpen(true)}
      >
        <ImageGalleryItemImage src={webformatURL} alt={tags} />
      </ImageItem>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <img src={largeImageURL} alt={tags} width={600} height={400} />
      </Modal>
    </div>
  );
};
