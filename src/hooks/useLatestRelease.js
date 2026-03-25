import { useState, useEffect } from 'react'

const API_URL = 'https://api.github.com/repos/citadel-tech/coinswap/releases/latest'
const LATEST_RELEASE_URL = 'https://github.com/citadel-tech/coinswap/releases/latest'
const REFRESH_INTERVAL_MS = 5 * 60 * 1000

/**
 * Fetches the latest GitHub release for citadel-tech/coinswap.
 * Returns { tag, url, loading, error }
 */
export function useLatestRelease() {
  const [state, setState] = useState({
    tag: null,
    url: LATEST_RELEASE_URL,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function loadLatestRelease() {
      try {
        const response = await fetch(API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
        })

        if (!response.ok) {
          throw new Error(`GitHub API ${response.status}`)
        }

        const data = await response.json()

        if (!cancelled) {
          setState({
            tag: data.tag_name,
            url: LATEST_RELEASE_URL,
            loading: false,
            error: null,
          })
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            tag: null,
            url: LATEST_RELEASE_URL,
            loading: false,
            error: err.message,
          })
        }
      }
    }

    loadLatestRelease()
    const intervalId = window.setInterval(loadLatestRelease, REFRESH_INTERVAL_MS)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  return state
}
