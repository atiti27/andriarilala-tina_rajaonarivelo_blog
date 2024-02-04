import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/Fields/FormField"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"
import ErrorMessage from "@/web/components/ui/ErrorMessage"
import Alert from "@/web/components/ui/Alert"
import { useEffect } from "react"
import { useRouter } from "next/router"
import ProfileSettingsSection from "@/web/components/ui/ProfileSettingsSection"

const initialValues = {
  username: "",
  email: "",
  password: "",
}
const validationSchema = object({
  username: usernameValidator.optional().label("Username"),
  email: emailValidator.optional().label("E-mail"),
  password: passwordValidator.optional().label("Password"),
})
const SettingsPage = () => {
  const { session } = useSession()
  const router = useRouter()
  const userId = session?.id
  const {
    isFetching,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient(`/profile/${userId}`),
    enabled: userId !== null,
  })
  const { mutateAsync, isSuccess, isError, error } = useMutation({
    mutationFn: (values) => {
      const validValues = Object.fromEntries(
        Object.entries(values).filter(([, value]) => value !== ""),
      )
      apiClient.patch(`/profile/${userId}`, validValues)
    },
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)
    resetForm()
    refetch()
  }
  useEffect(() => {
    if (session === null) {
      router.push("/sign-in")
    }
  }, [session, router])

  if (isSuccess) {
    return <Alert className="my-4">Settings saved</Alert>
  }

  if (isError) {
    return <ErrorMessage error={error} className="my-4" />
  }

  return (
    <div>
      {isFetching ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold p-4 items-center">Settings</h1>
          <ProfileSettingsSection user={user} />
          <p>Change your settings</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField
                name="username"
                label="Edit username"
                type="text"
                placeholder="Enter new username"
              />
              <FormField
                name="email"
                label="Edit email"
                type="text"
                placeholder="Enter new email"
              />
              <FormField
                name="password"
                label="Edit password"
                type="password"
                placeholder="Enter new password"
              />
              <SubmitButton>Save</SubmitButton>
            </Form>
          </Formik>
        </>
      )}
    </div>
  )
}

export default SettingsPage
