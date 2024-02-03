import { DURATION_TIME } from "@/utils/constants"
import { contentValidator } from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const initialValues = {
  title: "",
  content: "",
}
const validationSchema = object({
  title: contentValidator.label("Title"),
  content: contentValidator.label("Content"),
})
const CreatePostPage = () => {
  const router = useRouter()
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post("/posts", values),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)
    resetForm()
    setTimeout(() => {
      router.push("/my-posts")
    }, DURATION_TIME)
  }

  return (
    <div className="h-screen clex items-center justify-center">
      <h1 className="text-3xl font-semibold p-4 items-center">Create Post</h1>
      {isSuccess && (
        <Alert variant="success" className="my-4">
          Your post has been created successfully
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            name="title"
            type="text"
            placeholder="Enter the title of your new post"
          />
          <FormField
            name="content"
            type="text"
            placeholder="Enter the content of your new post"
          />
          <SubmitButton>Publish</SubmitButton>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePostPage
