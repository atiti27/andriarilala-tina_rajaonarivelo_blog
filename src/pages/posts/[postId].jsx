import { contentValidator } from "@/utils/validators"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

// Rajouter fonctions pour les commentaires
// Changer le style
// Changer format de la date: dans utils/dateFormatters
// Ajouter une condition pour vérifier si l'user qui est connecté est l'auteur de ce post pour lui permettre d'éditer
const initialValues = {
  content: "",
}
const validationSchema = object({
  content: contentValidator.optional().label("Comment"),
})
const PostPage = () => {
  const router = useRouter()
  const {
    query: { postId },
  } = router
  const { isFetching: isPostFetching, data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => apiClient(`/posts/${postId}`),
    enabled: true,
  })
  const {
    isFetching: isCommentsFetching,
    data: comments,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => apiClient(`/posts/${postId}/comments`),
    enabled: true,
  })
  const { mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post(`/posts/${postId}/comments`, values),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await mutateAsync(values)

    resetForm()
    refetch()
  }
  console.log("comments", comments)

  return (
    <div className="h-screen clex items-center justify-center">
      {isPostFetching || isCommentsFetching ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-semibold p-4 items-center">
            {post.title}
          </h1>
          <div className="p-2">
            <p>{post.content}</p>
            <p>By {post.author.username}</p>
            <p>Updated at {post.updatedAt}</p>
          </div>
          <div>
            <h2>Comments</h2>
            {comments?.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>By {comment.author.username}</p>
                <p>Updated at {comment.updatedAt}</p>
              </div>
            ))}
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <FormField
                    name="content"
                    label="Comment"
                    type="text"
                    placeholder="Enter your comment"
                  />
                  <SubmitButton>Submit</SubmitButton>
                </Form>
              </Formik>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PostPage
