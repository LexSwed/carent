import {
  LinkType,
  isEmpty,
  getTitleOfDoc,
  getAttrOfDocElement,
  fixRelativeUrls,
  getYoutTubeVideoId,
  getBaseUrl,
  LinkData,
  getImageData,
} from './utils'

export function scrapAudio(url: string): LinkData {
  return {
    title: url.substring(url.lastIndexOf('/') + 1),
    description: url.substring(url.lastIndexOf('/') + 1),
    url: url,
    type: LinkType.AUDIO,
  }
}

export function scrapImage(url: string): LinkData {
  return {
    title: url.substring(url.lastIndexOf('/') + 1),
    description: url.substring(url.lastIndexOf('/') + 1),
    url: url,
    image: { src: url, rel: 'preview' },
    type: LinkType.IMAGE,
  }
}

export function scrapInstagram(url: string, responseText: string): LinkData {
  const scrappedData = JSON.parse(responseText)

  return {
    title: scrappedData.title,
    url: url,
    description: scrappedData.title,
    image: scrappedData.thumbnail_url,
    type: LinkType.IMAGE, // MIME Type
  }
}

export function scrapDefault(url: string, page: Document): LinkData {
  const image = getImageData(page)

  return {
    title: getTitleOfDoc(page),
    url: getAttrOfDocElement(page, "meta[property='og:url']", 'content') || url,
    description: getAttrOfDocElement(page, "meta[name='description']", 'content'),
    image: image
      ? {
          rel: image.rel,
          src: fixRelativeUrls(getBaseUrl(page, url), image.src),
        }
      : undefined,
    type: LinkType.DEFAULT, // MIME Type
  }
}

export function scrapTwitter(url: string, responseText: string, page: Document): LinkData {
  const scrappedData = JSON.parse(responseText)

  let baseUrl = getBaseUrl(page, url)

  const image = getImageData(page)

  const videos = [
    getAttrOfDocElement(page, "meta[property='og:video:url']", 'content'),
    getAttrOfDocElement(page, "meta[property='og:video:secure_url']", 'content'),
  ]
    .filter((src) => !!src)
    .map((i) => fixRelativeUrls(baseUrl, i))

  return {
    title: getTitleOfDoc(page),
    description: scrappedData.author_name,
    url: getAttrOfDocElement(page, "meta[property='og:url']", 'content') || url,
    video: videos[0],
    image,
    type: LinkType.TWITTER,
  }
}

export function scrapVideo(url: string): LinkData {
  return {
    title: url.substring(url.lastIndexOf('/') + 1),
    video: isEmpty(url),
    url: url,
    type: LinkType.VIDEO,
  }
}

export function scrapYoutube(url: string, page: Document): LinkData {
  const id = getYoutTubeVideoId(url)

  return {
    title: getTitleOfDoc(page),
    url: url,
    type: LinkType.YOUTUBE,
    image: {
      src: `https://img.youtube.com/vi/${id}/0.jpg`,
      rel: 'preview',
    },
  }
}
