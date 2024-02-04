import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import Loader from "@/web/components/ui/Loader"
import UsersTable from "@/web/components/ui/UsersTable"
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
  }, [session, router])

  return (
    <div className="h-screen clex items-center justify-center">
      {isFetching ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold p-4">Admin Panel</h1>
          <h2 className="text-2xl font-semibold mb-2">Users</h2>
          {showAlert && (
            <Alert className="my-4">
              Changes have been changed successfully
            </Alert>
          )}
          <UsersTable
            users={users}
            handleUpdate={handleClickUpdateAuthorRole}
            handleEnable={handleClickUpdateEnabled}
            handleDelete={handleClickDelete}
          />
        </>
      )}
    </div>
  )
}

export default AdminPanelPage
