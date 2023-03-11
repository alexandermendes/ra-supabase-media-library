import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { MediaLibraryOptions } from './options';

export const MediaLibraryContext = createContext<MediaLibraryOptions | null>(
  null,
);

type MediaLibraryProviderProps = MediaLibraryOptions & {
  children: ReactNode;
};

export const MediaLibraryProvider: FC<MediaLibraryProviderProps> = ({
  children,
  supabase,
  resource,
  bucket,
  bucketFolder,
  accept,
  maxSize,
  aspectRatio,
  sort,
  croppable,
  parseImageUrl,
  formatImageUrl,
  resizeOptions,
  convertFileName,
}) => {
  const value = useMemo(
    (): MediaLibraryOptions => ({
      supabase,
      resource,
      bucket,
      bucketFolder,
      accept,
      maxSize,
      aspectRatio,
      sort,
      croppable,
      parseImageUrl,
      formatImageUrl,
      resizeOptions,
      convertFileName,
    }),
    [
      supabase,
      resource,
      bucket,
      bucketFolder,
      accept,
      maxSize,
      aspectRatio,
      sort,
      croppable,
      parseImageUrl,
      formatImageUrl,
      resizeOptions,
      convertFileName,
    ],
  );

  return (
    <MediaLibraryContext.Provider value={value}>
      {children}
    </MediaLibraryContext.Provider>
  );
};

export const useMediaLibraryContext = (): MediaLibraryOptions => {
  const context = useContext(MediaLibraryContext);

  if (!context) {
    throw new Error(
      'useMediaLibraryContext must be called from within a MediaLibraryProvider',
    );
  }

  return context;
};
