import { useSession } from "@/web/components/SessionContext"
import Loader from "@/web/components/ui/Loader"
import PostSection from "@/web/components/ui/PostSection"
import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"

const MyPostsPage = () => {
  const { session } = useSession()
  const router = useRouter()
  const { isFetching, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient(`/posts?authorId=${session.id}`),
    enabled: session !== null,
  })
  const { isFetching: isPostsCountFetching, data: postCount } = useQuery({
    queryKey: ["postsCount"],
    queryFn: () => apiClient(`/kpis-user?userId=${session.id}`),
    enabled: session !== null,
  })
  const handleClick = (id) => () => {
    router.push(`/posts/${id}`)
  }
  useEffect(() => {
    if (session === null) {
      router.push("/sign-in")
    }
  }, [session, router])

  return (
    <div className="h-screen clex items-center justify-center">
      {isFetching ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold p-4 items-center">My Posts</h1>
          {isPostsCountFetching ? null : <p>📰 {postCount} posts</p>}
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
              <PostSection
                post={post}
                key={post.id}
                handleClick={handleClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyPostsPage
