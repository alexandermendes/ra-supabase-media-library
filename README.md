# React Admin Supabase Media Library

A media library for [React Admin](https://marmelab.com/react-admin/).

![Screenshot](screenshot.png)

## Installation

```text
yarn add ra-supabase-media-library
```

## Usage

Wrap your `Admin` component in the `MediaLibraryProvider`:

```tsx
import { MediaLibraryProvider } from 'ra-supabase-media-library';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

<MediaLibraryProvider
  supabase={supabase}
  resource="media"
  bucket="images"
  bucketFolder="public">
  <Admin>
    {/* ... */}
  </Admin>
</MediaLibraryProvider>
```

Use the `MediaLibraryInput` to add an input that opens the media library for
you to select and upload images or videos:

```tsx
import { MediaLibraryInput } from 'ra-supabase-media-library';

<MediaLibraryInput source="videoId" label="Video" />
<MediaLibraryInput source="heroImageId" label="Hero Image" />
```
