import { FC } from 'react';

type MediaLibraryVideoProps = {
  src: string;
};

export const MediaLibraryVideo: FC<MediaLibraryVideoProps> = ({
  src,
}: MediaLibraryVideoProps) => (
  // eslint-disable-next-line jsx-a11y/media-has-caption
  <video
    key={src} // Trigger re-render when src changes
    style={{
      width: '100%',
      display: 'block',
    }}>
    <source src={src} type="video/mp4" />
  </video>
);
