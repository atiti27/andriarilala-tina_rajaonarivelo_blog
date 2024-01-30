/* eslint-disable max-lines-per-function */
import { useClickOutside } from "@/utils/useClickOutside"
import DashboardMenu from "@/web/components/DashboardMenu"
import { useSession } from "@/web/components/SessionContext"
import SettingsMenu from "@/web/components/SettingsMenu"
import Link from "@/web/components/ui/Link"
import { useRef, useState } from "react"

const Header = () => {
  const { session, signOut } = useSession()
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [showDashboardMenu, setShowDashboardMenu] = useState(false)
  const settingsMenuRef = useRef(null)
  const dashboardMenuRef = useRef(null)
  const handleSignOutClick = () => {
    signOut()
  }
  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu)
  }
  const toggleDashboardMenu = () => {
    setShowDashboardMenu(!showDashboardMenu)
  }

  useClickOutside(settingsMenuRef, toggleSettingsMenu)
  useClickOutside(dashboardMenuRef, toggleDashboardMenu)

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
                  onClick={toggleDashboardMenu}
                  className="cursor-pointer relative"
                >
                  My dashboard
                </div>
                {showDashboardMenu && (
                  <div ref={dashboardMenuRef} className="absolute">
                    <DashboardMenu handleClick={toggleDashboardMenu} />
                  </div>
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
