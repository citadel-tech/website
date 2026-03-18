import { useState, useEffect } from 'react'

const API_URL = 'https://api.github.com/repos/citadel-tech/coinswap/releases/latest'

/**
 * Fetches the latest GitHub release for citadel-tech/coinswap.
 * Returns { tag, url, loading, error }
 */
export function useLatestRelease() {
  const [state, setState] = useState({ tag: null, url: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } })
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`)
        return r.json()
      })
      .then(data => {
        if (!cancelled) {
          setState({ tag: data.tag_name, url: data.html_url, loading: false, error: null })
        }
      })
      .catch(err => {
        if (!cancelled) {
          setState({ tag: null, url: null, loading: false, error: err.message })
        }
      })

    return () => { cancelled = true }
  }, [])

  return state
}
