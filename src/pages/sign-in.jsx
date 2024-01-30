import { emailValidator, passwordValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import ErrorMessage from "@/web/components/ui/ErrorMessage"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const initialValues = {
  email: "",
  password: "",
}
const validationSchema = object({
  email: emailValidator.label("E-mail"),
  password: passwordValidator.label("Password"),
})
const SignInPage = () => {
  const router = useRouter()
  const { saveSessionToken } = useSession()
  const { mutateAsync, error } = useMutation({
    mutationFn: (values) => apiClient.post("/sessions", values),
  })
  const handleSubmit = async (values) => {
    const { result: jwt } = await mutateAsync(values)

    saveSessionToken(jwt)

    router.push("/posts")
  }

  return (
    <>
      <h1 className="text-3xl font-semibold p-4 text-center">Sign in</h1>
      <ErrorMessage error={error} className="my-4" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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
          <SubmitButton>Sign In</SubmitButton>
        </Form>
      </Formik>
    </>
  )
}

export default SignInPage
