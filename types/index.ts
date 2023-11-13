// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface Provider {
  name: string;
  id: string;
}

export type PlaylistStore = {
  playlist: Playlist;
  setPlaylist: (playlist: string) => void;
};

export type Playlist =
  | {
      id: string | null;
      collaborative: boolean;
      description: string;
      external_urls: ExternalURLs;
      href: string;
      images: Array<Image>;
      name: string;
      owner: Owner;
      primary_color: string | null;
      public: boolean;
      snapshot_id: string;
      tracks: Tracks;
      type: string;
      uri: string;
    }
  | { id: string };

export type ExternalURLs = {
  spotify: string;
};

export type Owner = {
  display_name: string;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type Image = {
  height: number | null;
  url: string;
  width: number | null;
};

export type Tracks = {
  href: string;
  total: number;
};
