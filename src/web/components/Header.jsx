/* eslint-disable max-lines-per-function */
import { useClickOutside } from "@/utils/useClickOutside"
import AuthorMenu from "@/web/components/AuthorMenu"
import { useSession } from "@/web/components/SessionContext"
import SettingsMenu from "@/web/components/SettingsMenu"
import Link from "@/web/components/ui/Link"
import { useRef, useState } from "react"

const Header = () => {
  const { session, signOut } = useSession()
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [showAuthorMenu, setShowAuthorMenu] = useState(false)
  const settingsMenuRef = useRef(null)
  const authorMenuRef = useRef(null)
  const handleSignOutClick = () => {
    signOut()
  }
  const toggleAuthorMenu = () => {
    setShowAuthorMenu(!showAuthorMenu)
  }
  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu)
  }

  useClickOutside(authorMenuRef, toggleAuthorMenu)
  useClickOutside(settingsMenuRef, toggleSettingsMenu)

  return (
    <header className="w-full border-b-2 bg-indigo-100 drop-shadow z-10 fixed">
      <div className="flex md:max-w-5xl mx-auto p-4">
        <div className="text-2xl font-semibold">BLOG</div>
        <nav className="ms-auto">
          <ul className="flex h-full gap-4 items-center">
            {session ? (
              <>
                <li>
                  <Link styless href="/posts">
                    Last posts
                  </Link>
                </li>
                {session.isAuthor && (
                  <>
                    <div
                      onClick={toggleAuthorMenu}
                      className="cursor-pointer relative"
                    >
                      As author
                    </div>
                    {showAuthorMenu && (
                      <div ref={authorMenuRef} className="absolute">
                        <AuthorMenu handleClick={toggleAuthorMenu} />
                      </div>
                    )}
                  </>
                )}
                <div
                  onClick={toggleSettingsMenu}
                  className="cursor-pointer relative"
                >
                  Settings Menu
                </div>
                {showSettingsMenu && (
                  <div ref={settingsMenuRef} className="absolute">
                    <SettingsMenu handleClick={toggleSettingsMenu} />
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
                  <Link
                    styless
                    href="/sign-up"
                    className="rounded-sm bg-indigo-500 active:bg-indigo-700 text-white p-2 drop-shadow-md"
                  >
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
