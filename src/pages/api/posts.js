import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { contentValidator, idValidator } from "@/utils/validators"

const handle = mw({
  // Middleware pour vérifier que l'user est connecté
  // Middleware pour vérifier que l'user est un author et faire la relation d'insertion avec le user
  POST: [
    validate({
      body: {
        title: contentValidator,
        content: contentValidator,
        userId: idValidator,
      },
    }),
    async (ctx) => {
      const {
        input: { body },
        models: { PostModel },
        res,
      } = ctx
      const post = await PostModel.query()
        .insertAndFetch(body)
        .withGraphFetched("author")
        .modifyGraph("author", (builder) => {
          builder.select("username", "email")
        })
      res.send(post)
    },
  ],
  GET: [
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
