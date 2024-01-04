import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { contentValidator } from "@/utils/validators"

const handle = mw({
  // Middleware pour vérifier que l'user est un author
  POST: [
    auth,
    validate({
      body: {
        title: contentValidator,
        content: contentValidator,
      },
    }),
    async (ctx) => {
      const {
        input: { body },
        models: { PostModel },
        session: { id: userId },
        res,
      } = ctx
      const post = await PostModel.query()
        .insertAndFetch({ userId, ...body })
        .withGraphFetched("author")
        .modifyGraph("author", (builder) => {
          builder.select("username", "email")
        })

      res.send(post)
    },
  ],
  GET: [
    auth,
    async (ctx) => {
      const {
        models: { PostModel },
        res,
      } = ctx
      const posts = await PostModel.query()
        .withGraphFetched("author")
        .modifyGraph("author", (builder) => {
          builder.select("username", "email")
        })
        .orderBy("updatedAt", "desc")

      res.send(posts)
    },
  ],
})

export default handle

// Ne pas oublier les kpis (posts count) pour le dashboard
// => Faire fichier/route kpis pour le count des posts et des comments
