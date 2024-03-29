import { FC } from 'react';
import { Labeled, WrapperField } from 'react-admin';
import { Box, useTheme } from '@mui/material';
import { MediaLibraryInputContents } from './MediaLibraryInputContents';
import type { MediaLibraryOptions } from './options';

type MediaLibraryInputProps = Partial<MediaLibraryOptions> & {
  label?: string;
  source: string;
};

export const MediaLibraryInput: FC<MediaLibraryInputProps> = ({
  label,
  source,
}: MediaLibraryInputProps) => {
  const theme = useTheme();

  return (
    <Labeled>
      <WrapperField label={label}>
        <Box
          sx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            marginBottom: theme.spacing(4),
            width: 300,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
          <MediaLibraryInputContents source={source} />
        </Box>
      </WrapperField>
    </Labeled>
  );
};
