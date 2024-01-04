import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"

const Header = () => {
  const { session } = useSession()

  return (
    <header className="border-b-2 bg-slate-100">
      <div className="flex md:max-w-3xl mx-auto p-4">
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
                <li>
                  <Link styless href="/categories">
                    List categories
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
                  <Link styless href="/sign-up">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link styless href="/sign-in">
                    Sign In
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
