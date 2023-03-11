import { SupabaseClient } from '@supabase/supabase-js';
import { SortPayload } from 'react-admin';

export type MediaLibraryOptions = {
  supabase: SupabaseClient;
  resource: string;
  bucket: string;
  bucketFolder?: string;
  accept?: string | string[];
  maxSize?: number;
  aspectRatio?: string;
  sort?: SortPayload;
  croppable?: boolean;
  parseImageUrl?: (url: string) => string;
  formatImageUrl?: (
    url: string,
    containerWidth?: number,
    crop?: number[],
  ) => string;
  convertFileName?: boolean;
  resizeOptions?: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    exifOrientation?: number;
    fileType?: string;
  };
};
