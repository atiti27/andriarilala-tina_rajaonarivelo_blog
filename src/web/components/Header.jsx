import { useClickOutside } from "@/utils/useClickOutside"
import { useSession } from "@/web/components/SessionContext"
import SettingsMenu from "@/web/components/SettingsMenu"
import Link from "@/web/components/ui/Link"
import { useRef, useState } from "react"

const Header = () => {
  const { session, signOut } = useSession()
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const settingsMenuRef = useRef(null)
  const handleSignOutClick = () => {
    signOut()
  }
  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu)
  }

  useClickOutside(settingsMenuRef, toggleSettingsMenu)

  return (
    <header className="border-b-2 bg-slate-100">
      <div className="flex md:max-w-5xl mx-auto p-4">
        <div className="text-2xl">BLOG</div>
        <nav className="ms-auto">
          <ul className="flex h-full gap-4 items-center">
            {session ? (
              <>
                <li>
                  <Link styless href="/posts">
                    Last posts
                  </Link>
                </li>
                <div
                  onClick={toggleSettingsMenu}
                  className="cursor-pointer relative"
                >
                  Settings Menu
                </div>
                {showSettingsMenu && (
                  <div ref={settingsMenuRef} className="absolute">
                    <SettingsMenu />
                  </div>
                )}
                <li>
                  <Link styless onClick={handleSignOutClick} href="/sign-in">
                    Sign out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link styless href="/">
                    Home Page
                  </Link>
                </li>
                <li>
                  <Link styless href="/sign-in">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link styless href="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
