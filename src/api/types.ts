export interface TrackType {
  id: number
  name: string
  icon: string
}

export interface Tracks {
  [key: string]: TrackType
}
