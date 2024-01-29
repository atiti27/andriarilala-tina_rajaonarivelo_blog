import { faker } from "@faker-js/faker"

// Password of admin is "Azerty1234&"
export const seed = async (db) => {
  await db("comments").delete()
  await db("posts").delete()
  await db("users").delete()
  await db.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1")
  await db.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
  await db.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1")
  const passwordHashAdmin =
    "7502504aecbb8da670f34de773aef9234a9b3d677efb84a1348318e0b4d12844b41765e88f9c34149f50bbdb02416f32ed1991e3de26cfa08dd7c64204ae82f1f162c78c3fd4e19e034e3d9394535d4aeec86e63ecb70a04106f8f67edb5a0fdff90df543991e433724a8d2ac1fd93e68f92a9fb34dab0f4185856c657c165feb51d6f09c01a058eb0bc3c4f00737f9488607f715a704a2dce367459a97f5eaa213738fbe29fabab9aec03778fb490b5d9e6a50ffe4bede425e7d363ac962d1dd83de7d2cfb8e3d036d62ac901f1dbc4e0389adb5257bca153d092db416729b3e9d4d08856f28b6d016505cbe8dfe54469f75341921e60add5da432362ded719"
  const passwordSaltAdmin =
    "c0fdca3fd0edea3e620b5c7ac1211fac8b7e872f03eb4040f4755c436cfb7777b50fe342a7794b2bcd32d0483bf362520e83f628f9d5cd5c2f301019b3fd0f16b6686d2c7ba880c050cd8e020b6049b92273d715af8eb8fbcc8b51f4695ac077f9cacbb360e9016411e74ac24a6a03f0aae212ccc248d498846f857f6e1b99dc2308f00a41bcab79335374549235e4169a496d9a59e7a2cd53f7b174a84ec4285d687f8a2ea789711ec8318f518982cca93b1d55bc6eccc883cd18f8c79a0b18336c7adc0668159a666f3709030cdd3cb345704f4ad7f188178ca096895fadf8d0dca2583fe563a09d9ac199e31ac5b4997a9328bd0d29223da950d8b1c54b64"
  await db("users").insert({
    username: "admin",
    email: "admin@example.com",
    passwordHash: passwordHashAdmin,
    passwordSalt: passwordSaltAdmin,
    isAdmin: true,
    isAuthor: true,
    isEnabled: true,
  })
  const authorSeeds = await db("users")
    .insert(
      [...new Array(5)].map(() => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: "alskdjalsdkjasdlkj",
        passwordSalt: "alskdjalsdkjasdlkj",
        isAdmin: false,
        isAuthor: true,
        isEnabled: true,
      })),
    )
    .returning("*")
  const nonAuthorSeeds = await db("users")
    .insert(
      [...new Array(5)].map(() => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: "alskdjalsdkjasdlkj",
        passwordSalt: "alskdjalsdkjasdlkj",
        isAdmin: false,
        isAuthor: false,
        isEnabled: true,
      })),
    )
    .returning("*")
  const users = [...authorSeeds, ...nonAuthorSeeds]
  const postSeeds = await db("posts")
    .insert(
      [...new Array(30)].map(() => {
        const author =
          users[faker.number.int({ min: 0, max: users.length - 1 })]

        return {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          userId: author.id,
        }
      }),
    )
    .returning("*")
  await db("comments").insert(
    [...new Array(30)].map(() => {
      const author = users[faker.number.int({ min: 0, max: users.length - 1 })]
      const post =
        postSeeds[faker.number.int({ min: 0, max: postSeeds.length - 1 })]

      return {
        content: faker.lorem.sentence(),
        userId: author.id,
        postId: post.id,
      }
    }),
  )
}
