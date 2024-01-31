import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { contentValidator, idValidator } from "@/utils/validators"
import { UnauthorizedError } from "@/api/errors"

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
        session: { id: userId },
        res,
      } = ctx
      const query = PostModel.query()
      const post = await query.clone().findById(postId)
      const { userId: authorId } = post

      if (authorId !== userId) {
        throw new UnauthorizedError()
      }

      const updatedPost = await query
        .clone()
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
        session: { id: userId },
        res,
      } = ctx
      const deletedPost = await PostModel.query().findById(postId)
      const { userId: authorId } = deletedPost

      if (authorId !== userId) {
        throw new UnauthorizedError()
      }

      await deletedPost.$query().delete()

      res.send(deletedPost)
    },
  ],
})

export default handle
