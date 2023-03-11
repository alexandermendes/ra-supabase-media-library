import { Dispatch, FC, SetStateAction } from 'react';
import { RaRecord, useListContext } from 'react-admin';
import { Box, useTheme } from '@mui/material';
import { MediaLibraryButton } from './MediaLibraryButton';
import { useMediaLibraryContext } from './MediaLibraryProvider';

type MediaLibraryModalListProps = {
  selectedRecord?: RaRecord;
  setSelectedRecord: Dispatch<SetStateAction<RaRecord>>;
};

export const MediaLibraryModalList: FC<MediaLibraryModalListProps> = ({
  selectedRecord,
  setSelectedRecord,
}: MediaLibraryModalListProps) => {
  const { data } = useListContext();
  const theme = useTheme();
  const { aspectRatio } = useMediaLibraryContext();

  if (!data) {
    return null;
  }

  return (
    <Box
      component="ul"
      sx={{
        padding: 0,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
          xl: 'repeat(8, 1fr)',
        },
        gridGap: theme.spacing(2),
        px: theme.spacing(2),
      }}>
      {data?.map((record) => (
        <Box
          key={record.id}
          component="li"
          sx={{
            width: '100%',
            height: 'auto',
            listStyle: 'none',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.palette.grey[300]}`,
            boxShadow:
              selectedRecord === record
                ? `0 0 0 4px ${theme.palette.primary.main}`
                : undefined,
            aspectRatio,
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MediaLibraryButton
              src={record.src}
              title={record.title}
              width={record.width}
              height={record.height}
              crop={record.crop}
              onClick={() => {
                setSelectedRecord(record);
              }}
            />
          </div>
        </Box>
      ))}
    </Box>
  );
};
