import { Box, useTheme } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import {
  Button,
  List,
  Pagination,
  RaRecord,
  useDelete,
  useGetList,
} from 'react-admin';
import { MediaLibraryModalList } from './MediaLibraryModalList';
import { useMediaLibraryContext } from './MediaLibraryProvider';
import { useSupabaseStorage } from './useSupabaseStorage';

type MediaLibrarySelectPanelProps = {
  source: string;
  onImageSelect: (newRecord: RaRecord) => void;
};

export const MediaLibrarySelectPanel: FC<MediaLibrarySelectPanelProps> = ({
  source,
  onImageSelect,
}: MediaLibrarySelectPanelProps) => {
  const theme = useTheme();
  const { resource, sort } = useMediaLibraryContext();
  const [selectedRecord, setSelectedRecord] = useState<RaRecord>();
  const { remove } = useSupabaseStorage();

  const [deleteOne] = useDelete();
  const { total: totalRecordsWithSelectedSrc } = useGetList(resource, {
    filter: { src: selectedRecord?.src },
  });

  const onSelectClick = useCallback(() => {
    if (selectedRecord) {
      onImageSelect(selectedRecord);
    }
  }, [onImageSelect, selectedRecord]);

  const onDeleteClick = useCallback(() => {
    if (!selectedRecord) {
      return;
    }

    deleteOne(resource, { id: selectedRecord.id });

    // Remove the item from Supabase, if it isn't used by any other records.
    if (totalRecordsWithSelectedSrc && totalRecordsWithSelectedSrc > 1) {
      return;
    }

    const fileName = selectedRecord?.src.substring(
      selectedRecord.src.lastIndexOf('/') + 1,
    );

    if (fileName) {
      remove(fileName);
    }
  }, [
    remove,
    selectedRecord,
    deleteOne,
    resource,
    totalRecordsWithSelectedSrc,
  ]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <List
        resource={resource}
        actions={false}
        hasCreate={false}
        empty={false}
        perPage={50}
        storeKey={`media-library-${resource}-${source}`}
        sort={sort}
        pagination={
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: `${theme.spacing(1)} ${theme.spacing(3)} ${theme.spacing(
                1,
              )} 0px`,
            }}>
            <Pagination />
            <Box>
              <Button
                onClick={onDeleteClick}
                variant="outlined"
                size="large"
                label="Delete"
                disabled={!selectedRecord}
                sx={{
                  marginRight: theme.spacing(2),
                  color: theme.palette.error.main,
                  borderColor: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                    color: 'white',
                  },
                }}
              />
              <Button
                onClick={onSelectClick}
                variant="contained"
                size="large"
                label="Select"
                disabled={!selectedRecord}
              />
            </Box>
          </Box>
        }
        sx={{
          flex: 1,
          height: '100%',
          '.MuiPaper-root': { borderRadius: 0, flex: 1 },
          '.RaList-main': {
            height: '100%',
            flex: 1,
            overflow: 'auto',
          },
        }}>
        <MediaLibraryModalList
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      </List>
    </Box>
  );
};
