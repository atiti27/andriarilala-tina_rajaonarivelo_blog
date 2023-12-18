import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { contentValidator, idValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async (ctx) => {
      const {
        input: {
          query: { postId },
        },
        models: { PostModel },
        res,
      } = ctx
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("author")
        .throwIfNotFound()

      res.send(post)
    },
  ],
  PATCH: [
    validate({
      query: {
        postId: idValidator,
      },
      body: {
        title: contentValidator.optional(),
        content: contentValidator.optional(),
      },
    }),
    async (ctx) => {
      const {
        input: {
          query: { postId },
          body,
        },
        models: { PostModel },
        res,
      } = ctx
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, {
          ...body,
          updatedAt: PostModel.fn.now(),
        })
        .withGraphFetched("author")
        .throwIfNotFound()

      res.send(updatedPost)
    },
  ],
  // Pas sûr que le post peut être supprimé car pas de consignes dessus d'après le cahier des charges
  DELETE: [
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async (ctx) => {
      const {
        input: {
          query: { postId },
        },
        models: { PostModel },
        res,
      } = ctx
      const deletedPost = await PostModel.query()

      await deletedPost.$query().deleteById(postId)

      res.send(deletedPost)
    },
  ],
})

export default handle

// Ne pas oublier les kpis (visits per post) pour le dashboard
