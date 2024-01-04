import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"

const handle = mw({
  // Rajouter un middleware ou condition pour vérifier que l'user qui fait la requête GET est un admin
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
  // Faire un middleware car seul l'admin peut lister les users
  GET: [
    auth,
    async (ctx) => {
      const {
        models: { UserModel },
        res,
      } = ctx
      const users = await UserModel.query().select(
        "id",
        "username",
        "email",
        "isAdmin",
        "isAuthor",
      )

      res.send(users)
    },
  ],
})

export default handle
