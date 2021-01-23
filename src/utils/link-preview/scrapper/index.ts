import {
  scrapVideo,
  scrapAudio,
  scrapImage,
  scrapInstagram,
  scrapYoutube,
  scrapTwitter,
  scrapDefault,
} from './scrappers'
import { isVideo, isAudio, isImage, isYoutubeUrl, isEmpty, isInstagramUrl, isTwitterUrl } from './utils'

const scrapper = async (url: string, makeRequest: () => Promise<any>) => {
  if (!isEmpty(url)) {
    const response = await makeRequest()
    const mimeType = response.headers.get('content-type')

    if (isVideo(mimeType)) {
      return scrapVideo(url)
    }
    if (isAudio(mimeType)) {
      return scrapAudio(url)
    }
    if (isImage(mimeType)) {
      return scrapImage(url)
    }
    const data = await response.text()
    if (isInstagramUrl(url)) {
      return scrapInstagram(url, data)
    }

    const htmlDoc = new DOMParser().parseFromString(data, 'text/html')
    if (isYoutubeUrl(url)) {
      return scrapYoutube(url, htmlDoc)
    }
    if (isTwitterUrl(url)) {
      return scrapTwitter(url, data, htmlDoc)
    }
    return scrapDefault(url, htmlDoc)
  }
}

export default scrapper
