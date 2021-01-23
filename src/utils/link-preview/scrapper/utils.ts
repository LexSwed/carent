const REGEX_YOUTUBE = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi
export const isYoutubeUrl = (url) => !!url.toString().match(REGEX_YOUTUBE)

const REGEX_INSTAGRAM = /(https?:\/\/www\.)?instagram\.com(\/p\/\w+\/?)/gi
export const isInstagramUrl = (url) => !!url.toString().match(REGEX_INSTAGRAM)

const REGEX_TWITTER = /(https?:\/\/(www)?\.?)?twitter\.com\/.+/gi
export const isTwitterUrl = (url) => !!url.toString().match(REGEX_TWITTER)

const isEmptyObject = (obj: any) => {
  if (typeof obj.length === 'undefined') {
    // it's an Object, not an Array
    let hasNonempty = Object.keys(obj).some((element) => !isEmpty(obj[element]))
    return hasNonempty ? false : isEmptyObject(Object.keys(obj))
  }

  return !obj.some(function nonEmpty(element) {
    // check if array is really not empty as JS thinks
    return !isEmpty(element) // at least one element should be non-empty
  })
}
export const isEmpty = (value: any) => {
  return (
    // eslint-disable-next-line eqeqeq
    value == false ||
    typeof value === 'undefined' ||
    value == null ||
    (typeof value === 'object' && isEmptyObject(value))
  )
}

export const isAudio = (mimeType: string) => mimeType.startsWith('audio/')
export const isVideo = (mimeType: string) => mimeType.startsWith('video/')
export const isImage = (mimeType: string) => mimeType.startsWith('image/')

export const getTitleOfDoc = (htmlDoc: Document) => {
  const titleEl = htmlDoc.querySelector('title')
  if (!titleEl) {
    return null
  }
  return titleEl.innerText
}

export const getAttrOfDocElement = (htmlDoc: Document, query: string, attr: string): string | null => {
  const el = htmlDoc.head.querySelectorAll(query)?.[0]
  if (!el) {
    return null
  }
  return el.getAttribute(attr)
}

export const getYoutTubeVideoId = (url: string) => {
  const parsed = url.match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?]*).*/)

  if (parsed && parsed[3]) {
    return parsed[3]
  } else {
    return null
  }
}

export const getInstagramVideo = (htmlDoc: any) => {
  const videoLinkMatcher = /(?:"video_url":")(.*?)(?:")/g
  if (videoLinkMatcher.test(htmlDoc)) {
    const videoMatches = videoLinkMatcher.exec(htmlDoc)
    if (videoMatches && videoMatches.length !== 0) {
      return videoMatches[0].split('":"')[1].replace('"', '')
    }
  }
  return null
}

export const fixRelativeUrls = (baseUrl: string, itemUrl: string) => {
  const normalizedUrl = itemUrl.toLocaleLowerCase()
  if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
    return itemUrl
  }
  return new URL(itemUrl, baseUrl).href
}

export const getBaseUrl = (htmlDoc: Document, url: string) =>
  getAttrOfDocElement(htmlDoc, 'base', 'href') || new URL(url).origin

export const proxyUrl = (url: string) => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com'

  if (isInstagramUrl(url)) {
    const modifiedInstaUrl = `https://api.instagram.com/oembed/?url=${url}`
    return `${proxyUrl}/${modifiedInstaUrl}`
  } else if (isTwitterUrl(url)) {
    const modifiedInstaUrl = `https://publish.twitter.com/oembed?url=${url}`
    return `${proxyUrl}/${modifiedInstaUrl}`
  } else {
    return `${proxyUrl}/${url}`
  }
}

const imageQueries = [
  { query: 'meta[property="og:image"]', attr: 'content', rel: 'preview' },
  { query: 'meta[property="og:image:secure_url"]', attr: 'content', rel: 'preview' },
  { query: 'meta[property="og:image:url"]', attr: 'content', rel: 'preview' },
  { query: 'meta[property="og:image"]', attr: 'content', rel: 'preview' },
  { query: 'meta[name="twitter:image:src"]', attr: 'content', rel: 'preview' },
  { query: 'meta[name="twitter:image"]', attr: 'content', rel: 'preview' },
  { query: 'meta[itemprop="image"]', attr: 'content', rel: 'preview' },
  { query: 'meta[property="og:logo"]', attr: 'content', rel: 'preview' },
  { query: 'meta[itemprop="logo"]', attr: 'content', rel: 'icon' },
  { query: 'link[rel="icon"]', attr: 'href', rel: 'icon' },
] as const
export function getImageData(page): LinkData['image'] {
  for (const query of imageQueries) {
    const src = getAttrOfDocElement(page, query.query, query.attr)
    if (src) {
      return {
        src,
        rel: query.rel,
      }
    }
  }
}

export const LinkType = {
  YOUTUBE: 'YOUTUBE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE',
  DEFAULT: 'DEFAULT',
  INSTAGRAM: 'INSTAGRAM',
  TWITTER: 'TWITTER',
} as const

export type ILinkType = keyof typeof LinkType

export interface LinkData {
  title: string
  type: ILinkType
  url: string
  description?: string
  video?: string
  image?: { src: string; rel: 'icon' | 'preview' }
}
