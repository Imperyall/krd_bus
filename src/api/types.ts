export interface RouteType {
  id: string
  route: string
  checked: boolean
}

export type TrackTypeWithRoutes = TrackType & {
  routes: RouteType[]
}

export interface TrackType {
  id: TrackTypeId
  name: string
  icon: string
}

export type TrackTypeId = '0' | '1' | '3' | '4' | '5' | '6'
