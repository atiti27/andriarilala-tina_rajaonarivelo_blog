import { number, object, string } from "yup"

const validationSchema = object({
  db: object({
    client: string().oneOf(["pg"]).required(),
    connection: string().required(),
  }).noUnknown(),
  security: object({
    password: object({
      iterations: number().min(10000).required(),
      keylen: number().min(128).required(),
      digest: string().oneOf(["sha3-512"]),
      pepper: string().min(256).required(),
    }),
  }).noUnknown(),
}).noUnknown()
const data = {
  db: {
    client: "pg",
    connection: process.env.DB__CONNECTION,
  },
  security: {
    password: {
      iterations: 100000,
      keylen: 256,
      digest: "sha3-512",
      pepper: process.env.SECURITY__PASSWORD__PEPPER,
    },
  },
}
const config = (() => {
  try {
    return validationSchema.validateSync(data, {
      stripUnknown: true,
      abortEarly: false,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  }

  return null
})()

export default config
