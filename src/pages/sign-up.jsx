import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/Fields/FormField"
import apiClient from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import Link from "next/link"
import { object } from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}
const validationSchema = object({
  username: usernameValidator.label("Username"),
  email: emailValidator.label("E-mail"),
  password: passwordValidator.label("Password"),
})
const SignUpPage = () => {
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post("/users", values),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>Your account has been created successfully. </Alert>
        <p>
          <Link className="text-blue-500" href="/sign-in">
            Go to sign-in page.
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-semibold p-4 text-center">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
          />
          <FormField
            name="email"
            label="E-mail"
            type="email"
            placeholder="Enter your e-mail"
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <SubmitButton className="text-center rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900">
            Sign Up
          </SubmitButton>
        </Form>
      </Formik>
    </>
  )
}

export default SignUpPage
