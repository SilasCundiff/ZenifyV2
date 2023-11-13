export type User = {
  id: number;
  name: string;
};

export interface Provider {
  name: string;
  id: string;
}

export type SelectedPlaylist = {
  playlist: {
    id: string;
    name?: string | null;
  };
  setPlaylist: (id: string) => void;
};

export type PlaylistStore = {
  playlist: Playlist;
  setPlaylist: (playlist: Playlist) => void;
};

export type Playlist = {
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
} | null;

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
  limit: number | null;
  next: string | null;
  offset: number | null;
  previous: string | null;
  items: Array<Track>;
};

export type Track = {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  primary_color: string | null;
  track: TrackDetails;
  video_thumbnail: VideoThumbnail | null;
};

export type TrackDetails = {
  album: Album;
  artists: Array<Artist>;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDs;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
};

export type VideoThumbnail = {
  url: string | null;
};

export type Album = {
  album_type: string;
  artists: Array<Artist>;
  available_markets: Array<string>;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Array<Image>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: ExternalURLs;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ExternalIDs = {
  isrc: string;
};
