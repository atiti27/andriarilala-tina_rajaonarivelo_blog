import { contentValidator } from "@/utils/validators"
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

    if (!isSuccess) {
      resetForm()
      // + rajouter une autre erreur

      return
    }

    router.push("/posts")
    // Ou créer une route qui va récupérer les posts d'un auteur (la personne même en particulier)
  }

  return (
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
  )
}

export default CreatePostPage
