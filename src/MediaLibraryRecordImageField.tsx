import { FC } from 'react';
import { useRecordContext } from 'react-admin';
import { MediaLibraryImg } from './MediaLibraryImg';
import { isVideo } from './utils';
import { MediaLibraryVideo } from './MediaLibraryVideo';

type MediaLibraryRecordImageFieldProps = {
  width?: number;
};

export const MediaLibraryRecordImageField: FC<
  MediaLibraryRecordImageFieldProps
> = ({ width: containerWidth = 150 }: MediaLibraryRecordImageFieldProps) => {
  const record = useRecordContext();
  const { src, title, width, height, crop } = record;

  return (
    <div style={{ width: containerWidth }}>
      {isVideo(src) ? (
        <MediaLibraryVideo src={src} />
      ) : (
        <MediaLibraryImg
          src={src}
          title={title}
          width={width}
          height={height}
          crop={crop}
          containerWidth={containerWidth}
        />
      )}
    </div>
  );
};
