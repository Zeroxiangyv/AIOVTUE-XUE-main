import {
  albumWebdavHttpToNetlifyResult,
  buildAlbumWebdavRequestUrl,
  handleAlbumWebdavHttp,
} from '../../server/albumWebdavHttp'

export async function handler(event: {
  path: string
  httpMethod: string
  body?: string | null
  headers?: Record<string, string | undefined>
  queryStringParameters?: Record<string, string> | null
  rawUrl?: string
}) {
  const host = event.headers?.host || event.headers?.Host || 'localhost'
  const requestUrl = buildAlbumWebdavRequestUrl({
    host,
    path: event.path,
    rawUrl: event.rawUrl,
  })

  const headers = new Headers()
  for (const [key, value] of Object.entries(event.headers || {})) {
    if (value !== undefined)
      headers.set(key, value)
  }

  const request = new Request(requestUrl, {
    method: event.httpMethod,
    headers,
    body: event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD' && event.body
      ? event.body
      : undefined,
  })

  const response = await handleAlbumWebdavHttp(request)
  return albumWebdavHttpToNetlifyResult(response)
}
