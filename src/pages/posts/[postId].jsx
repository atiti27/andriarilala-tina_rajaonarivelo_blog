/* eslint-disable max-lines-per-function */
import { formatDate } from "@/utils/dateFormatters"
import { contentValidator } from "@/utils/validators"
import PostEdit from "@/web/components/EditPost"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Buttons/Button"
import CommentInput from "@/web/components/ui/CommentInput"
import CommentSection from "@/web/components/ui/CommentSection"
import Form from "@/web/components/ui/Form"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { object } from "yup"

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
                <h2 className="text-2xl font-semibold">Comments</h2>
                <div className="flex flex-col gap-4 p-2">
                  {comments?.map((comment) => (
                    <CommentSection key={comment.id} comment={comment} />
                  ))}
                </div>
                <div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <CommentInput name="content" label="Comment" />
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
