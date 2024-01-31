import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async (ctx) => {
      const {
        input: {
          query: { userId },
        },
        models: { PostModel },
        res,
      } = ctx
      const [{ count: postsCount }] = await PostModel.query()
        .count()
        .where("userId", userId)

      res.send(postsCount)
    },
  ],
})

export default handle
