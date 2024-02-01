import Link from "@/web/components/ui/Link"

const AuthorMenu = (props) => {
  const { handleClick } = props

  return (
    <div className="z-10 mt-2 p-3 shadow-md absolute space-y-2 bg-slate-100 top-right">
      <li>
        <Link styless href="/posts/create" onClick={handleClick}>
          New post
        </Link>
      </li>
      <li>
        <Link styless href="/my-posts" onClick={handleClick}>
          My posts
        </Link>
      </li>
    </div>
  )
}

export default AuthorMenu
