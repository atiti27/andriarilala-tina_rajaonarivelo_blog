import Loader from "@/web/components/ui/Loader"
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
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-semibold p-4 items-center">Posts</h1>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <section
                key={post.id}
                className="p-2 rounded-sm bg-slate-200 hover:cursor-pointer hover:bg-slate-300"
                onClick={handleClick(post.id)}
              >
                <h2>{post.title}</h2>
                <p className="line-clamp-2">{post.content}</p>
                <p>By {post.author.username}</p>
                <p>Updated at {post.updatedAt}</p>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PostsPage
