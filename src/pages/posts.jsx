import Loader from "@/web/components/ui/Loader"
import PostSection from "@/web/components/ui/PostSection"
import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const PostsPage = () => {
  const router = useRouter()
  const { isFetching, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient("/posts"),
    enabled: true,
  })
  const handleClick = (id) => () => {
    router.push(`/posts/${id}`)
  }

  return (
    <div className="h-screen clex items-center justify-center">
      {isFetching ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="md:max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold p-4 items-center">Posts</h1>
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <PostSection
                post={post}
                key={post.id}
                handleClick={handleClick}
                isAuthor
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostsPage
