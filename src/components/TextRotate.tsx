import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  className?: string
}

export interface TextRotateRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      rotationInterval = 3000,
      className = "",
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const next = useCallback(() => {
      if (isAnimating) return
      setIsAnimating(true)
      const nextIndex = currentTextIndex === texts.length - 1 ? 0 : currentTextIndex + 1
      setCurrentTextIndex(nextIndex)
      setTimeout(() => setIsAnimating(false), 500)
    }, [currentTextIndex, texts.length, isAnimating])

    const previous = useCallback(() => {
      if (isAnimating) return
      setIsAnimating(true)
      const prevIndex = currentTextIndex === 0 ? texts.length - 1 : currentTextIndex - 1
      setCurrentTextIndex(prevIndex)
      setTimeout(() => setIsAnimating(false), 500)
    }, [currentTextIndex, texts.length, isAnimating])

    const jumpTo = useCallback((index: number) => {
      if (isAnimating) return
      const validIndex = Math.max(0, Math.min(index, texts.length - 1))
      setCurrentTextIndex(validIndex)
    }, [texts.length, isAnimating])

    const reset = useCallback(() => {
      if (isAnimating) return
      setCurrentTextIndex(0)
    }, [isAnimating])

    useImperativeHandle(ref, () => ({
      next,
      previous,
      jumpTo,
      reset,
    }), [next, previous, jumpTo, reset])

    useEffect(() => {
      const intervalId = setInterval(next, rotationInterval)
      return () => clearInterval(intervalId)
    }, [next, rotationInterval])

    return (
      <div
        className={`transition-all duration-500 transform ${
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        } ${className}`}
      >
        {texts[currentTextIndex]}
      </div>
    )
  }
)

TextRotate.displayName = "TextRotate"

export { TextRotate }