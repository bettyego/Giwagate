import { useEffect } from 'react'
import { site } from '../content/site.js'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.promise}`
  }, [title])
}
