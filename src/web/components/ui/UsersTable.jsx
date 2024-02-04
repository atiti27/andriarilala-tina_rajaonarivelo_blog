import { useSession } from "@/web/components/SessionContext"

const UsersTable = (props) => {
  const { users, handleUpdate, handleEnable, handleDelete } = props
  const { session } = useSession()

  return (
    <table className="w-full border-collapse border-indigo-300 border-solid border-2 rounded-lg">
      <thead>
        <tr className="py-2 bg-indigo-100">
          <th className="p-2">Username</th>
          <th className="p-2">Email</th>
          <th className="p-2">Author ?</th>
          <th className="p-2">Enabled ?</th>
          <th className="p-2">🗑️</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {users?.map((user) => {
          if (session.id === user.id) {
            return null
          }

          return (
            <tr key={user.id} className=" hover:bg-slate-200 cursor-pointer">
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button onClick={handleUpdate(user.id)}>
                  {user.isAuthor ? "✅" : "❌"}
                </button>
              </td>
              <td className="p-2">
                <button onClick={handleEnable(user.id)}>
                  {user.isEnabled ? "✅" : "❌"}
                </button>
              </td>
              <td className="p-2">
                <button
                  className="bg-indigo-300 text-white p-2 rounded-lg"
                  onClick={handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UsersTable
