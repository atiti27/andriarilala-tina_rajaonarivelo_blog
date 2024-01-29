import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"

const SettingsMenu = () => {
  const {
    session: { isAdmin },
  } = useSession()

  return (
    <div className="z-10 mt-2 p-3 shadow-md absolute space-y-2 bg-slate-100 top-right">
      <li>
        <Link styless href="/settings">
          Profile Settings
        </Link>
      </li>
      {isAdmin && (
        <li>
          <Link styless href="/admin-panel">
            Admin Panel
          </Link>
        </li>
      )}
    </div>
  )
}

export default SettingsMenu
