import { useEffect, useState } from "react"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  return isMobile
}

export default useIsMobile
