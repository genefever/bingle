const OPEN_WEATHER_API_KEY = 'e5920fe1a6b8c2295e118ca469f38da6'

export interface WikiData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
}

export async function fetchApiData(query: string): Promise<string> {
  const url =
    'http://localhost:4000/api?' +
    new URLSearchParams({
      query: query,
    })

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Wiki data could not be retrieved.')
  }

  const data: string = await res.json()
  //   console.log(data)
  return data
}

export async function fetchWikiData(query: string): Promise<WikiData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`
  )

  if (!res.ok) {
    throw new Error('Wiki data could not be retrieved.')
  }

  const data: WikiData = await res.json()
  //   console.log(data)
  return data
}
