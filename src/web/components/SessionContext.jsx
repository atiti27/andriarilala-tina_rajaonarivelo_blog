import config from "@/web/config"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import jsonwebtoken from "jsonwebtoken"
import apiClient from "@/web/services/apiClient"

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = (props) => {
  const [session, setSession] = useState(null)
  const saveSessionToken = useCallback((jwt) => {
    localStorage.setItem(config.security.session.storageKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])
  const signOut = useCallback(() => {
    localStorage.removeItem(config.security.session.storageKey)

    apiClient.delete("/sessions")

    setSession(null)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.session.storageKey)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])

  return (
    <SessionContext.Provider
      value={{
        session,
        saveSessionToken,
        signOut,
      }}
      {...props}
    />
  )
}
