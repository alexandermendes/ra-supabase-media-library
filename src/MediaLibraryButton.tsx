import { FC } from 'react';
import { Button } from 'react-admin';
import { MediaLibraryButtonContents } from './MediaLibraryButtonContents';

type MediaLibraryButtonProps = {
  src?: string;
  title: string;
  width?: number;
  height?: number;
  crop?: number[];
  onClick: () => void;
  isImageLoading?: boolean;
};

export const MediaLibraryButton: FC<MediaLibraryButtonProps> = ({
  src,
  title,
  onClick,
  width,
  height,
  crop,
  isImageLoading,
}: MediaLibraryButtonProps) => (
  <Button
    onClick={onClick}
    variant="text"
    size="small"
    sx={{
      padding: 0,
      width: '100%',
      height: '100%',
      '.MuiButton-startIcon': { margin: 0 },
    }}>
    <MediaLibraryButtonContents
      src={src}
      title={title}
      width={width}
      height={height}
      crop={crop}
      isImageLoading={isImageLoading}
    />
  </Button>
);
