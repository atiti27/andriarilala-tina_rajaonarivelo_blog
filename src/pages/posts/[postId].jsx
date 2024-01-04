import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

// Rajouter fonctions pour les commentaires
// Changer le style
// Changer format de la date: dans utils/dateFormatters
// Ajouter une condition pour vérifier si l'user qui est connecté est l'auteur de ce post pour lui permettre d'éditer
const PostPage = () => {
  const router = useRouter()
  const {
    query: { postId },
  } = router
  const { isFetching, data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => apiClient(`/posts/${postId}`),
    enabled: true,
  })

  return (
    <div className="h-screen clex items-center justify-center">
      {isFetching ? (
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
        </>
      )}
    </div>
  )
}

export default PostPage
