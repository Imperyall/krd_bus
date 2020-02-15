import { Route, Track } from '@/store/modules/track/types'
import { RouteType, RouteIdType } from './types'

const routeIds: RouteIdType[] = ['0', '1', '3', '4', '5', '6']

export const baseRoutes: RouteType[] = [
  { id: '0', name: 'Автобус', icon: 'img/tracks/bus.svg' },
  { id: '1', name: 'Троллейбус', icon: 'img/tracks/trolley.svg' },
  { id: '3', name: 'Трамвай', icon: 'img/tracks/tram.svg' },
  { id: '4', name: 'Маршрутка', icon: 'img/tracks/minibus.svg' },
  // { id: '5', name: 'Сезонный автобус', icon: 'img/tracks/seasonal.svg' },
  { id: '6', name: 'Пригородный автобус', icon: 'img/tracks/shuttle.svg' },
]

const getRouteId = (data: string) =>
  routeIds.find(id => id === data.slice(-1)) || '0'

const getRoute = (data: string) =>
  baseRoutes.find(type => type.id === getRouteId(data)) as RouteType

const filters: ((data: string[]) => boolean)[] = [
  // Трамваи выше 30 номера
  (data: string[]): boolean =>
    getRoute(data[0]).id !== '3' || +data[1].replace(/\s/g, '') < 30,
  // Пустые маршруты
  (data: string[]): boolean => data[1].replace(/\s/g, '') !== '',
]

export const getGps = async (url: string): Promise<Route[]> => {
  const response = await fetch(`${url}?${+new Date()}`)
  const body = await response.text()
  const result = body && body.match(/[^\r\n]+/g)

  if (!result) {
    return []
  }

  return result.reduce((acc: Route[], cur: string) => {
    const data = cur.split(',')
    const name = data[1].replace(/\s/g, '')

    if (name === '0') return acc

    const route = getRoute(data[0])

    // Фильтрация данных
    for (const filterFunction of filters) {
      if (!filterFunction(data)) {
        return acc
      }
    }

    const track: Track = {
      id: `${route.id}-${name}-${data[6]}`,
      name,
      vehicleId: data[6],
      lng: +data[2] / 1e6,
      lat: +data[3] / 1e6,
      speed: +data[4],
    }

    let accRoute = acc.find(r => r.id === route.id)

    if (!accRoute) {
      accRoute = { ...route, tracks: [track] }

      return [...acc, accRoute]
    }

    accRoute.tracks.push(track)

    return acc
  }, [])
}
