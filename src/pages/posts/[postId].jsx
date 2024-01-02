import apiClient from "@/web/services/apiClient"

export const getServerSideProps = async ({ query: { postId } }) => {
  const data = await apiClient(`/posts/${postId}`)

  return {
    props: { initialData: data },
  }
}
// Rajouter fonctions pour les commentaires
// Changer le style
// Changer format de la date: dans utils/dateFormatters
// Ajouter une condition pour vérifier si l'user qui est connecté est l'auteur de ce post pour lui permettre d'éditer
const PostPage = ({ initialData }) => (
  <div className="h-screen clex items-center justify-center">
    <h1 className="text-3xl font-semibold p-4 items-center">
      {initialData.title}
    </h1>
    <div className="p-2">
      <p>{initialData.content}</p>
      <p>By {initialData.author.username}</p>
      <p>Updated at {initialData.updatedAt}</p>
    </div>
  </div>
)

export default PostPage
