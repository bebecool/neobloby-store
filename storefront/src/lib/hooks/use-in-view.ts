import { useCallback, useEffect, useState } from "react"

// Hook compatible avec l'ancien useIntersection
const useInView = (
  ref?: React.RefObject<HTMLElement>,
  threshold?: string,
  options?: IntersectionObserverInit
): boolean => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: threshold || "0px",
        ...options
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, options])

  return inView
}

// Export par défaut pour la compatibilité
export default useInView

// Export nommé pour l'ancien code
export const useIntersection = useInView
