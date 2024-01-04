import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import {
  emailValidator,
  idValidator,
  passwordValidator,
  statusValidator,
  usernameValidator,
} from "@/utils/validators"
import checkRoles from "@/api/middlewares/checkRoles"

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
        .select("id", "username", "email", "isAdmin", "isAuthor")
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
        isAdmin: statusValidator.optional(),
        isAuthor: statusValidator.optional(),
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
        .select("id", "username", "email", "isAdmin", "isAuthor")

      res.send(updatedUser)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
    }),
    checkRoles(["isAdmin"]),
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
