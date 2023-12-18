import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { contentValidator } from "@/utils/validators"

// Revoir peut-être l'arborescence de l'API (ex: [postId]/comments => comments d'un post)

const handle = mw({
  // Checker que le user est connecté
  // Liaison avec l'auteur du commentaire et la liaison avec le post visé
  POST: [
    validate({
      body: {
        content: contentValidator,
      },
    }),
    async (ctx) => {
      const {
        input: { body },
        models: { CommentModel },
        res,
      } = ctx
      const comment = await CommentModel.query().insertAndFetch(body)

      res.send(comment)
    },
  ],
  // Liste des commentaires d'un post
  // Middleware pour checker que l'user est connecté
  GET: [
    async (ctx) => {
      const {
        models: { CommentModel },
        res,
      } = ctx
      const comments = await CommentModel.query()

      res.send(comments)
    },
  ],
})

export default handle

// Ne pas oublier les kpis (comments count) pour le dashboard
