export interface WikiData {
  title: string
  description: string
  url: string
}

// Make a call to the api server to fetch the 3 most relevant Wiki data.
export async function fetchWikiData(query: string): Promise<any> {
  // TODO change to heroku on deployment
  const url =
    'http://localhost:4000/api?' +
    new URLSearchParams({
      q: query,
    })
  // const url =
  //   'https://bingleserver.herokuapp.com/api?' +
  //   new URLSearchParams({
  //     q: query,
  //   })

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Wiki data could not be retrieved.')
  }

  const data = await res.json()
  return data
}
