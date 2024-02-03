import { DURATION_TIME } from "@/utils/constants"
import { contentValidator } from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Buttons/Button"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const PostEdit = (props) => {
  const { post, setToggleEdit } = props
  const router = useRouter()
  const initialValues = {
    title: post.title,
    content: post.content,
  }
  const validationSchema = object({
    title: contentValidator.label("Title"),
    content: contentValidator.label("Content"),
  })
  const { mutateAsync: updatePost, isSuccess: isUpdateSuccess } = useMutation({
    mutationFn: (values) => apiClient.patch(`/posts/${post.id}`, values),
  })
  const { mutateAsync: deletePost, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: () => apiClient.delete(`/posts/${post.id}`),
  })
  const handleSubmit = async (values) => {
    await updatePost(values)

    if (isUpdateSuccess) {
      setTimeout(() => {
        setToggleEdit(false)
      }, DURATION_TIME)
    }
  }
  const handleDeletePost = async () => {
    await deletePost()

    setTimeout(() => {
      router.push("/my-posts")
    }, DURATION_TIME)
  }

  return (
    <div className="h-screen clex items-center justify-center">
      <h1 className="text-3xl font-semibold p-4 items-center">Edit Post</h1>
      {(isUpdateSuccess || isDeleteSuccess) && (
        <Alert variant="success" className="my-4">
          Your changes have been taken into account
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
          <SubmitButton>Update</SubmitButton>
          <Button type="button" onClick={handleDeletePost}>
            Delete
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default PostEdit
