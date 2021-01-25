import { useState, useEffect } from 'react'
import urlRegex from 'url-regex'

// Helpers
import scrapper from './scrapper'
import { proxyUrl, LinkData } from './scrapper/utils'

export type UseScraperConfig = {
  url: string
}

type LinkPreview = {
  /**
   * The responses to the request. Undefined if the request not done or returned
   * an error.
   */
  data: LinkData | null

  /** Loading status. `true` if loading, `false` otherwise. */
  loading: boolean

  /**
   * Error status. Undefined if the request returned a valid response or is
   * loading.
   */
  error: Error | null
}

export function useScraper({ url }: UseScraperConfig): LinkPreview {
  const [state, setState] = useState<LinkPreview>({
    data: null,
    loading: true,
    error: undefined,
  })

  useEffect(() => {
    const controller = new AbortController()

    const makeRequest = async (): Promise<void> => {
      const state: Partial<LinkPreview> = { loading: false, error: undefined }
      try {
        state.data = await scrapData(url, controller.signal)
      } catch (err) {
        state.error = err
      } finally {
        setState((old) => ({ ...old, ...state }))
      }
    }

    makeRequest()

    return () => {
      controller.abort()
    }
  }, [url])

  return state
}

export async function scrapData(url: string, signal?: AbortSignal): Promise<LinkData | null> {
  if (!isUrl(url)) {
    return null
  }
  if (cache.has(url)) {
    return cache.get(url)
  }
  const data = await scrapper(url, () => fetch(proxyUrl(url), { headers, signal }))
  cache.set(url, data)

  return data
}

/** headers passed to the fetch request */
const headers = { 'x-requested-with': '' }

const cache = {
  get: (key: string): LinkData | undefined => {
    try {
      const item = sessionStorage.getItem(key)

      return JSON.parse(item)
    } catch {
      return
    }
  },
  has: (key: string): boolean => {
    return !!sessionStorage.getItem(key)
  },
  set: (key: string, data: LinkData) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  },
}

export function isUrl(url: string) {
  return urlRegex({ exact: true }).test(url)
}
