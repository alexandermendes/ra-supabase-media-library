import { useTheme } from '@mui/material';
import { FC, useRef, useState } from 'react';
import BrokenImage from '@mui/icons-material/BrokenImage';
import { useMediaLibraryContext } from './MediaLibraryProvider';
import { MediaLibraryImage } from './image';

type MediaLibraryImgProps = MediaLibraryImage & {
  containerWidth?: number;
};

export const MediaLibraryImg: FC<MediaLibraryImgProps> = ({
  src,
  title,
  crop,
  containerWidth,
}: MediaLibraryImgProps) => {
  const theme = useTheme();
  const [hasError, setHasError] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { aspectRatio, formatImageUrl } = useMediaLibraryContext();
  const ref = useRef<HTMLImageElement>(null);

  const onError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <BrokenImage fontSize="large" sx={{ color: theme.palette.grey[500] }} />
    );
  }

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        aspectRatio,
      }}>
      <img
        src={formatImageUrl ? formatImageUrl(src, containerWidth, crop) : src}
        title={title}
        onError={onError}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        style={{
          objectFit: 'cover',
          width: '100%',
          maxHeight: '100%',
          display: isImageLoaded ? 'block' : 'none',
          aspectRatio,
        }}
        alt=""
      />
    </div>
  );
};
