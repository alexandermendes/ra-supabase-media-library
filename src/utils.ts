import { isMatch } from 'matcher';
import { videoExtensions } from './video';

export const getTabIds = (index: number) => ({
  tabId: `media-library-tab-${index}`,
  tabPanelId: `media-library-tabpanel-${index}`,
});

export const isImage = (file: File) => isMatch(file.type, 'image/*');

export const isVideo = (src: string) =>
  videoExtensions.some((ext) => src.endsWith(ext));
