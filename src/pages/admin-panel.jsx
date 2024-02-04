/* eslint-disable max-lines-per-function */
import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const AdminPanelPage = () => {
  const router = useRouter()
  const { session } = useSession()
  const [showAlert, setShowAlert] = useState(false)
  const {
    isFetching,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient("/users"),
    enabled: session !== null,
  })
  const { mutateAsync: updateUser, isSuccess: isUpdatedSuccess } = useMutation({
    mutationFn: (user) => apiClient.patch(`/users/${user.id}`, user),
  })
  const { mutateAsync: deleteUser, isSuccess: isDeletedSuccess } = useMutation({
    mutationFn: (id) => apiClient.delete(`/users/${id}`),
  })
  const handleClickUpdateAuthorRole = (id) => async () => {
    const user = users.find(({ id: userId }) => userId === id)
    await updateUser({
      ...user,
      isAuthor: !user.isAuthor,
    })
    refetch()
  }
  const handleClickUpdateEnabled = (id) => async () => {
    const user = users.find(({ id: userId }) => userId === id)
    await updateUser({
      ...user,
      isEnabled: !user.isEnabled,
    })
    refetch()
  }
  const handleClickDelete = (id) => async () => {
    await deleteUser(id)
    refetch()
  }
  useEffect(() => {
    if (isUpdatedSuccess || isDeletedSuccess) {
      setShowAlert(true)
    }
  }, [isUpdatedSuccess, isDeletedSuccess])
  useEffect(() => {
    if (session === null) {
      router.push("/sign-in")
    }
  }, [session])

  return (
    <div className="h-screen clex items-center justify-center">
      {isFetching ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <h1>Admin Panel</h1>
          <h2>Users</h2>
          {showAlert && (
            <Alert className="my-4">
              Changes have been changed successfully
            </Alert>
          )}
          <table className="w-full border-collapse border-blue-300 border-solid border-2">
            <thead>
              <tr>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Author ?</th>
                <th className="p-2">Enabled ?</th>
                <th className="p-2">🗑️</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                if (session.id === user.id) {
                  return null
                }

                return (
                  <tr
                    key={user.id}
                    className="bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      <button onClick={handleClickUpdateAuthorRole(user.id)}>
                        {user.isAuthor ? "✅" : "❌"}
                      </button>
                    </td>
                    <td className="p-2">
                      <button onClick={handleClickUpdateEnabled(user.id)}>
                        {user.isEnabled ? "✅" : "❌"}
                      </button>
                    </td>
                    <td className="p-2">
                      <button onClick={handleClickDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default AdminPanelPage
