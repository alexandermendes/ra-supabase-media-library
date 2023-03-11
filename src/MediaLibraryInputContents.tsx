import { FC, useState } from 'react';
import { RaRecord, useInput, useGetOne } from 'react-admin';
import { Box, IconButton, useTheme } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { useFormContext } from 'react-hook-form';
import { MediaLibraryModal } from './MediaLibraryModal';
import { MediaLibraryButton } from './MediaLibraryButton';
import { useMediaLibraryContext } from './MediaLibraryProvider';

type MediaLibraryInputContentsProps = {
  source: string;
};

export const MediaLibraryInputContents: FC<MediaLibraryInputContentsProps> = ({
  source,
}: MediaLibraryInputContentsProps) => {
  const { field } = useInput({ source });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { resource } = useMediaLibraryContext();
  const { setValue } = useFormContext();
  const theme = useTheme();

  const onClose = () => {
    setModalOpen(false);
  };

  const onImageSelect = (selectedRecord: RaRecord) => {
    field.onChange(selectedRecord.id);
    setModalOpen(false);
  };

  const onImageClick = () => {
    setModalOpen(true);
  };

  const { data, isLoading: isImageLoading } = useGetOne(resource, {
    id: field.value,
  });

  const { src, title, width, height, crop } = data ?? {};

  return (
    <Box sx={{ position: 'relative' }}>
      <MediaLibraryModal
        open={modalOpen}
        close={onClose}
        source={source}
        onImageSelect={onImageSelect}
      />
      <MediaLibraryButton
        src={src}
        title={title}
        onClick={onImageClick}
        width={width}
        height={height}
        crop={crop}
        isImageLoading={isImageLoading}
      />
      {src && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: theme.spacing(0.5),
            backgroundColor: 'white',
            border: `1px solid ${theme.palette.grey[200]}`,
          }}
          onClick={() => {
            setValue(source, null, { shouldDirty: true });
          }}>
          <Delete />
        </IconButton>
      )}
    </Box>
  );
};
