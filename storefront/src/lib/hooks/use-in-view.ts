import { useCallback, useEffect, useState } from "react"

const useInView = (
  options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement>, boolean] => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      options
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  const refCallback = useCallback((node: HTMLDivElement) => {
    setRef(node)
  }, [])

  return [{ current: ref } as React.RefObject<HTMLDivElement>, inView]
}

export default useInView
