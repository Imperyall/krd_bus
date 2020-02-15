import { RouteType as ApiRoute, RouteIdType } from '../../../api/types'
export interface Route extends ApiRoute {
  tracks: Track[]
}

export interface Track {
  id: string // Уникальный идентификатор
  name: string // Маршрутный номер
  vehicleId: string // ID транспорта
  lat: number // Широта
  lng: number // Долгота
  speed: number // Скорость транспорта
}

export type Showed = {
  [key in RouteIdType]?: string[]
}

export interface State {
  interval: undefined | number
  routes: Route[]
  showed: Showed
}
