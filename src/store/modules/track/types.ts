import { TrackTypeId } from '../../../api/types'
export interface Track {
  id: string // Уникальный ID
  vehicleId: string // ID транспорта
  type: TrackTypeId // Тип транспорта
  name: string // Название транспорта
  route: string // Маршрутный номер
  lat: number // Широта
  lng: number // Долгота
  speed: number // Скорость транспорта
  icon?: any // Иконка
}

export interface State {
  interval: undefined | number
  tracks: Track[]
}
