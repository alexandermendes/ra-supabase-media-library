import { Box, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNotify } from 'react-admin';
import prettyBytes from 'pretty-bytes';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useMediaLibraryContext } from './MediaLibraryProvider';

type MediaLibraryDropZoneProps = {
  onChange: (file: File) => void;
};

export const MediaLibraryDropZone: FC<MediaLibraryDropZoneProps> = ({
  onChange,
}: MediaLibraryDropZoneProps) => {
  const { maxSize } = useMediaLibraryContext();
  const notify = useNotify();

  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;

      onChange(file);
    },
    [onChange],
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const { errors } = fileRejections[0];
      const [error] = errors;

      const message =
        {
          'file-too-large': `file size is greater than ${prettyBytes(
            maxSize ?? 0,
          )}`,
        }[error.code] ?? error.message;

      notify(`File rejected: ${message}`, { type: 'error' });
    },
    [notify, maxSize],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxSize,
    onDropAccepted,
    onDropRejected,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}>
      <Box
        {...getRootProps()}
        sx={{
          cursor: 'pointer',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <input {...getInputProps()} />
        <Typography sx={{ userSelect: 'none' }}>
          Drop a file here, or click to select it.
        </Typography>
      </Box>
    </Box>
  );
};
