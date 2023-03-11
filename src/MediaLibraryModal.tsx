import { FC, SyntheticEvent, useState } from 'react';
import { Button, RaRecord } from 'react-admin';
import { useTheme, Typography, Modal, Box, Tab, Tabs } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { MediaLibraryTabPanel } from './MediaLibraryTabPanel';
import { getTabIds } from './utils';
import { MediaLibraryUploadPanel } from './MediaLibraryUploadPanel';
import { MediaLibrarySelectPanel } from './MediaLibrarySelectPanel';
import { useMediaLibraryContext } from './MediaLibraryProvider';

type MediaLibraryModalProps = {
  open: boolean;
  source: string;
  close: () => void;
  onImageSelect: (newRecord: RaRecord) => void;
};

export const MediaLibraryModal: FC<MediaLibraryModalProps> = ({
  open,
  source,
  close,
  onImageSelect,
}: MediaLibraryModalProps) => {
  const theme = useTheme();
  const { resource } = useMediaLibraryContext();

  const titleId = `medial-library-${resource}-${source}`;
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Modal open={open} aria-labelledby={titleId}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          position: 'fixed',
          zIndex: '1300',
          right: 30,
          bottom: 30,
          top: 30,
          left: 30,
          outline: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: `${theme.spacing(2)} ${theme.spacing(3)} 0 ${theme.spacing(
              3,
            )}`,
          }}>
          <Typography id={titleId} variant="h6" component="h2">
            Add media
          </Typography>
          <div>
            <Button
              onClick={close}
              label="Close"
              endIcon={<Close />}
              sx={{
                marginLeft: theme.spacing(2),
              }}
            />
          </div>
        </div>
        <Tabs
          value={tabIndex}
          onChange={onTabChange}
          sx={{ px: theme.spacing(1) }}
          aria-label="Media library">
          <Tab
            label="Media library"
            aria-controls={getTabIds(0).tabPanelId}
            id={getTabIds(1).tabId}
          />
          <Tab
            label="Upload files"
            aria-controls={getTabIds(1).tabPanelId}
            id={getTabIds(0).tabId}
          />
        </Tabs>
        <MediaLibraryTabPanel value={tabIndex} index={0}>
          <MediaLibrarySelectPanel
            source={source}
            onImageSelect={onImageSelect}
          />
        </MediaLibraryTabPanel>
        <MediaLibraryTabPanel value={tabIndex} index={1}>
          <MediaLibraryUploadPanel onImageSelect={onImageSelect} />
        </MediaLibraryTabPanel>
      </Box>
    </Modal>
  );
};
