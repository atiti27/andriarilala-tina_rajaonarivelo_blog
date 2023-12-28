import { emailValidator, passwordValidator } from "@/utils/validators"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { Formik } from "formik"
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
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <>
      <h1 className="text-3xl font-semibold p-4 text-center">Sign in</h1>
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
