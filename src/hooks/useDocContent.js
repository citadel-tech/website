import { useState, useEffect } from 'react'

const cache = new Map()

export function clearCache() {
  cache.clear()
}

export function useDocContent(url) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!url) return
    if (cache.has(url)) {
      setContent(cache.get(url))
      setLoading(false)
      setError(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setContent(null)
    setError(null)
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then(text => {
        if (cancelled) return
        cache.set(url, text)
        setContent(text)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [url])

  return { content, loading, error }
}
