import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

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
  const userId = session?.id
  const {
    isFetching,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient(`/users/${userId}`),
    enabled: userId !== null,
  })
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (values) => {
      const validValues = Object.fromEntries(
        Object.entries(values).filter(([, value]) => value !== ""),
      )
      apiClient.patch(`/users/${userId}`, validValues)
    },
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)
    resetForm()
    refetch()
  }

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <h1>Settings</h1>
          {isSuccess && <Alert className="my-4">Settings saved</Alert>}
          <h2>Username: {user?.username}</h2>
          <h2>Email: {user?.email}</h2>
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
