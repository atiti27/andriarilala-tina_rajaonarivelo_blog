import { ForbiddenError } from "@/api/errors"

const checkUniqueness = async (ctx) => {
  const {
    input: { body },
    models: { UserModel },
    next,
  } = ctx
  const existingUsername = await UserModel.query().findOne({
    username: body?.username,
  })

  if (existingUsername) {
    throw new ForbiddenError()
  }

  const existingEmail = await UserModel.query().findOne({
    email: body?.email,
  })

  if (existingEmail) {
    throw new ForbiddenError()
  }

  await next()
}

export default checkUniqueness
