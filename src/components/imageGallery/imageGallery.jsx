import { Gallery } from './imageGallery.styled';
import { ImageGalleryItem } from './imageGalleryItem';

export const ImageGallery = ({ hits }) => {
  return (
    <div>
      <Gallery className="gallery">
        {hits.map(({ id, largeImageURL, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </Gallery>
    </div>
  );
};
