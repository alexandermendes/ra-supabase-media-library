import { useCallback, useState } from 'react';
import fetch from 'unfetch';
import { isMatch } from 'matcher';
import { useNotify } from 'react-admin';
import { useMediaLibraryContext } from './MediaLibraryProvider';

export const useSupabaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { supabase, bucket, bucketFolder, accept } = useMediaLibraryContext();
  const notify = useNotify();

  const getFileLocation = useCallback(
    (fileName: string) => {
      if (!bucketFolder) {
        return fileName;
      }

      return `${bucketFolder}/${fileName}`;
    },
    [bucketFolder],
  );

  const getPublicUrl = useCallback(
    (fileName: string) => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(getFileLocation(fileName));

      return data.publicUrl;
    },
    [supabase, bucket, getFileLocation],
  );

  const uploadFile = useCallback(
    async (file: File, fileName: string) => {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(getFileLocation(fileName), file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        throw new Error(`Failed to upload file: ${error.message}`);
      }
    },
    [supabase, bucket, getFileLocation],
  );

  const upload = useCallback(
    async (file: File, fileName: string) => {
      if (!file) {
        throw new Error('The file could not be uploaded');
      }

      if (accept && !isMatch(file.type, accept)) {
        throw new Error(`Not an accepted file type: ${file.type}`);
      }

      setIsUploading(true);

      const publicUrl = getPublicUrl(fileName);
      const res = await fetch(publicUrl);

      // No need to upload again if this image was already uploaded
      if (res.status === 200) {
        setIsUploading(false);

        return { publicUrl, file };
      }

      try {
        await uploadFile(file, fileName);
      } catch (err) {
        setIsUploading(false);
        notify(err.message, { type: 'error' });

        throw err;
      }

      setIsUploading(false);

      return { publicUrl, file };
    },
    [notify, uploadFile, getPublicUrl, accept],
  );

  const remove = useCallback(
    async (fileName: string) => {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([getFileLocation(fileName)]);

      if (error) {
        throw new Error(`Failed to remove file: ${error.message}`);
      }
    },
    [bucket, getFileLocation, supabase.storage],
  );

  return {
    upload,
    remove,
    isUploading,
  };
};
