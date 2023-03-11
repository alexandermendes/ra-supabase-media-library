import { FC } from 'react';
import { MediaLibraryImg } from './MediaLibraryImg';
import { MediaLibraryVideo } from './MediaLibraryVideo';
import { isVideo } from './utils';

type MediaLibraryButtonContentsProps = {
  src?: string;
  title: string;
  width?: number;
  height?: number;
  crop?: number[];
  isImageLoading?: boolean;
};

export const MediaLibraryButtonContents: FC<
  MediaLibraryButtonContentsProps
> = ({
  src,
  title,
  width,
  height,
  crop,
  isImageLoading,
}: MediaLibraryButtonContentsProps) => {
  if (!src) {
    return <>Click to select an image</>;
  }

  if (isImageLoading) {
    return <>Loading...</>;
  }

  if (isVideo(src)) {
    return <MediaLibraryVideo src={src} />;
  }

  return (
    <MediaLibraryImg
      src={src}
      title={title}
      width={width}
      height={height}
      crop={crop}
    />
  );
};
