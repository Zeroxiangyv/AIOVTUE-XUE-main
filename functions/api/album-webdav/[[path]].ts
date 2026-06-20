import { handleAlbumWebdavHttp } from '../../../server/albumWebdavHttp'

interface Env {
  WEBDAV_PASSWORD?: string
}

export async function onRequest(context: { request: Request, env: Env }) {
  return handleAlbumWebdavHttp(context.request, {
    WEBDAV_PASSWORD: context.env.WEBDAV_PASSWORD,
  })
}
