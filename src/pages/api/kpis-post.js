import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"

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
        models: { CommentModel, PostsViewsModel },
        res,
      } = ctx
      const [{ count: commentsCount }] = await CommentModel.query()
        .count()
        .where("postId", postId)
      const [{ count: viewsCount }] = await PostsViewsModel.query()
        .count()
        .where("postId", postId)

      res.send({ commentsCount, viewsCount })
    },
  ],
})

export default handle
