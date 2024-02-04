import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  idValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"

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
        models: { UserModel },
        res,
      } = ctx
      const user = await UserModel.query()
        .findById(userId)
        .select("id", "username", "email")
        .throwIfNotFound()

      res.send(user)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
      body: {
        username: usernameValidator.optional(),
        email: emailValidator.optional(),
        password: passwordValidator.optional(),
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
        .select("id", "username", "email")

      res.send(updatedUser)
    },
  ],
})

export default handle
