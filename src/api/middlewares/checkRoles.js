import { ForbiddenError } from "@/api/errors"

const checkRoles = (roles) => async (ctx) => {
  const {
    session: { id: userId },
    models: { UserModel },
    next,
  } = ctx
  const isExistingUserWithRoles = await Promise.all(
    roles.map(async (role) => {
      const isUserWithRole = Boolean(
        await UserModel.query().findOne({
          id: userId,
          [role]: true,
        }),
      )

      return isUserWithRole
    }),
  )

  if (isExistingUserWithRoles.includes(false)) {
    throw new ForbiddenError()
  }

  await next()
}

export default checkRoles
