import { Track } from '@/store/modules/track/types'
import { TrackType, TrackTypeId } from './types'

const trackIds: TrackTypeId[] = ['0', '1', '3', '4', '5', '6']

export const trackTypes: TrackType[] = [
  { id: '0', name: 'Автобус', icon: 'img/tracks/bus.svg' },
  { id: '1', name: 'Троллейбус', icon: 'img/tracks/trolley.svg' },
  { id: '3', name: 'Трамвай', icon: 'img/tracks/tram.svg' },
  { id: '4', name: 'Маршрутка', icon: 'img/tracks/minibus.svg' },
  // { id: '5', name: 'Сезонный автобус', icon: 'img/tracks/seasonal.svg' },
  { id: '6', name: 'Пригородный автобус', icon: 'img/tracks/shuttle.svg' },
]

const getTypeId = (data: string) =>
  trackIds.find(id => id === data.slice(-1)) || '0'

const getType = (data: string) =>
  trackTypes.find(type => type.id === getTypeId(data)) as TrackType

const filters: ((data: string[]) => boolean)[] = [
  // Трамваи выше 30 номера
  (data: string[]): boolean =>
    getType(data[0]).id !== '3' || +data[1].replace(/\s/g, '') < 30,
  // Пустые маршруты
  (data: string[]): boolean => data[1].replace(/\s/g, '') !== '',
]

export const getGps = async (url: string): Promise<Track[]> => {
  const response = await fetch(`${url}?${+new Date()}`)
  const result = await response.text()
  const data = result && result.match(/[^\r\n]+/g)

  const ids: string[] = []

  if (data && data.length > 0) {
    return data.reduce((acc: Track[], cur: string): Track[] => {
      const data = cur.split(',')
      const route = data[1].replace(/\s/g, '')

      if (route === '0') return acc

      const type = getType(data[0])
      const id = `${type.id}-${data[6]}`

      if (ids.includes(id)) {
        return acc
      }

      // Фильтрация данных
      for (const filterFunction of filters) {
        if (!filterFunction(data)) {
          return acc
        }
      }

      ids.push(id)

      return [
        ...acc,
        {
          id,
          vehicleId: data[6],
          type: type.id,
          name: type.name,
          route,
          lng: +data[2] / 1e6,
          lat: +data[3] / 1e6,
          speed: +data[4],
          icon: type.icon,
        } as Track,
      ]
    }, [])
  }

  return []
}
