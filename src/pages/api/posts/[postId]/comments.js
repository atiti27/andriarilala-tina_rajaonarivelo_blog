import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { contentValidator, idValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    auth,
    validate({
      query: {
        postId: idValidator,
      },
      body: {
        content: contentValidator,
      },
    }),
    async (ctx) => {
      const {
        input: {
          body,
          query: { postId },
        },
        models: { CommentModel },
        res,
        session: { id: userId },
      } = ctx
      const comment = await CommentModel.query()
        .insertAndFetch({ postId, userId, ...body })
        .withGraphFetched("[post,author]")
        .modifyGraph("post", (builder) => {
          builder.select("title", "content")
        })
        .modifyGraph("author", (builder) => {
          builder.select("username")
        })

      res.send(comment)
    },
  ],
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
        models: { CommentModel },
        res,
      } = ctx
      const comments = await CommentModel.query()
        .withGraphFetched("[post,author]")
        .modifyGraph("post", (builder) => {
          builder.select("title", "content")
        })
        .modifyGraph("author", (builder) => {
          builder.select("username")
        })
        .where("postId", postId)
        .orderBy("createdAt", "desc")

      res.send(comments)
    },
  ],
})

export default handle

// Ne pas oublier les kpis (comments count) pour le dashboard
