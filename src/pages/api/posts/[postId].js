import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { contentValidator, idValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
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
        models: { PostModel, PostsViewsModel },
        res,
        session: { id: userId },
      } = ctx
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("[author,comments]")
        .modifyGraph("author", (builder) => {
          builder.select("username")
        })
        .throwIfNotFound()
      await PostsViewsModel.query().insert({ postId, userId })

      res.send(post)
    },
  ],
  // Rajouter un middleware ou condition pour vérifier que l'user qui fait la requête PATCH est l'auteur du post en question
  PATCH: [
    auth,
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
  DELETE: [
    auth,
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
      const deletedPost = await PostModel.query().findById(postId)

      await deletedPost.$query().delete()

      res.send(deletedPost)
    },
  ],
})

export default handle
