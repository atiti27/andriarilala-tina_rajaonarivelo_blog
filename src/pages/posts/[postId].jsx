/* eslint-disable max-lines-per-function */
import { calculateDeltaTime, formatDate } from "@/utils/dateFormatters"
import { contentValidator } from "@/utils/validators"
import PostEdit from "@/web/components/EditPost"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Buttons/Button"
import SubmitButton from "@/web/components/ui/Buttons/SubmitButton"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { object } from "yup"

// Changer le style
// Ajouter une condition pour vérifier si l'user qui est connecté est l'auteur de ce post pour lui permettre d'éditer
const initialValues = {
  content: "",
}
const validationSchema = object({
  content: contentValidator.optional(),
})
const PostPage = () => {
  const { session } = useSession()
  const router = useRouter()
  const [toggleEdit, setToggleEdit] = useState(false)
  const {
    query: { postId },
  } = router
  const { isFetching: isPostFetching, data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => apiClient(`/posts/${postId}`),
    enabled: session !== null && postId !== null,
  })
  const {
    isFetching: isCommentsFetching,
    data: comments,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => apiClient(`/posts/${postId}/comments`),
    enabled: session !== null && postId !== null,
  })
  const { isFetching: isViewsCountFetching, data: kpis } = useQuery({
    queryKey: ["viewsCount"],
    queryFn: () => apiClient(`/kpis-post?postId=${postId}`),
    enabled: session !== null && postId !== null,
  })
  const { mutateAsync: publishComment } = useMutation({
    mutationFn: (values) => apiClient.post(`/posts/${postId}/comments`, values),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await publishComment(values)

    resetForm()
    refetch()
  }
  const handleClick = () => {
    setToggleEdit(true)
  }

  return (
    <div className="h-screen">
      {isPostFetching || isCommentsFetching ? (
        <Loader />
      ) : (
        <>
          {toggleEdit && session.id === post.userId ? (
            <PostEdit post={post} setToggleEdit={setToggleEdit} />
          ) : (
            <>
              <div className="p-2 flex flex-col">
                <h1 className="text-3xl font-semibold p-4 items-center">
                  {post.title}
                </h1>
                {session?.id === post?.userId && (
                  <Button onClick={handleClick}>Edit</Button>
                )}
              </div>
              <div className="p-2">
                <p>{post.content}</p>
                <p>By {post.author.username}</p>
                <p>Last edited: {formatDate(post.updatedAt)}</p>
                <div>
                  {isViewsCountFetching ? null : (
                    <>
                      <p>👁️ {kpis.viewsCount}</p>
                      <p>💬 {kpis.commentsCount}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h2>Comments</h2>
                {comments?.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>By {comment.author.username}</p>
                    <p>Published {calculateDeltaTime(comment.updatedAt)}</p>
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
        </>
      )}
    </div>
  )
}

export default PostPage
