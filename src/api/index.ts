import { Track } from '@/store/modules/track/types'
import { Tracks, TrackType } from './types'

const types: Tracks = {
  '1': { id: 1, name: 'Троллейбус', icon: 'img/tracks/trolley.svg' },
  '3': { id: 2, name: 'Трамвай', icon: 'img/tracks/tram.svg' },
  '4': { id: 3, name: 'Микроавтобус', icon: 'img/tracks/minibus.svg' },
  '5': { id: 4, name: 'Сезонный автобус', icon: 'img/tracks/seasonal.svg' },
  '6': { id: 5, name: 'Пригородный автобус', icon: 'img/tracks/shuttle.svg' },
  default: { id: 0, name: 'Автобус', icon: 'img/tracks/bus.svg' },
}

const getType = (idx: string): TrackType =>
  types[idx.slice(-1)] || types.default

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
