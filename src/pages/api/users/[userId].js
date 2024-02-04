import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { idValidator, statusValidator } from "@/utils/validators"
import checkRoles from "@/api/middlewares/checkRoles"

const handle = mw({
  PATCH: [
    auth,
    checkRoles(["isAdmin"]),
    validate({
      query: {
        userId: idValidator,
      },
      body: {
        isAdmin: statusValidator.optional(),
        isAuthor: statusValidator.optional(),
        isEnabled: statusValidator.optional(),
      },
    }),
    async (ctx) => {
      const {
        input: {
          query: { userId },
          body,
        },
        models: { UserModel },
        res,
      } = ctx
      await UserModel.query()
        .update({
          ...body,
          updatedAt: UserModel.fn.now(),
        })
        .where({ id: userId })

      const updatedUser = await UserModel.query()
        .findById(userId)
        .select("id", "username", "email", "isAdmin", "isAuthor", "isEnabled")

      res.send(updatedUser)
    },
  ],
  DELETE: [
    auth,
    checkRoles(["isAdmin"]),
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
        models: { UserModel },
        res,
      } = ctx
      const user = await UserModel.query()
        .findById(userId)
        .select("id", "username", "email", "isAdmin", "isAuthor")
        .throwIfNotFound()

      await user.$query().delete()

      res.send(user)
    },
  ],
})

export default handle
