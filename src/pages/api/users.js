import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"
import checkRoles from "@/api/middlewares/checkRoles"

const handle = mw({
  POST: [
    validate({
      body: {
        username: usernameValidator,
        email: emailValidator,
        password: passwordValidator,
      },
    }),
    async (ctx) => {
      const {
        input: {
          body: { username, email, password },
        },
        models: { UserModel },
        res,
      } = ctx
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insert({
        username,
        email,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    auth,
    checkRoles(["isAdmin"]),
    async (ctx) => {
      const {
        models: { UserModel },
        res,
      } = ctx
      const users = await UserModel.query()
        .select("id", "username", "email", "isAdmin", "isAuthor", "isEnabled")
        .orderBy("id")

      res.send(users)
    },
  ],
})

export default handle
