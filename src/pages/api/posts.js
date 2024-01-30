import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { contentValidator, idValidator } from "@/utils/validators"
import checkRoles from "@/api/middlewares/checkRoles"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        title: contentValidator,
        content: contentValidator,
      },
    }),
    checkRoles(["isAuthor"]),
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
    validate({
      query: {
        authorId: idValidator.optional(),
      },
    }),
    async (ctx) => {
      const {
        input: {
          query: { authorId },
        },
        models: { PostModel },
        res,
      } = ctx
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("author")
        .modifyGraph("author", (builder) => {
          builder.select("username", "email")
        })
        .orderBy("updatedAt", "desc")

      if (authorId) {
        const postsQuery = await query
          .clone()
          .where("userId", authorId)
          .modifyGraph("author", (builder) => {
            builder.select("username", "email")
          })
          .orderBy("updatedAt", "desc")

        res.send(postsQuery)
      }

      res.send(posts)
    },
  ],
})

export default handle

// Ne pas oublier les kpis (posts count) pour le dashboard
// => Faire fichier/route kpis pour le count des posts et des comments
