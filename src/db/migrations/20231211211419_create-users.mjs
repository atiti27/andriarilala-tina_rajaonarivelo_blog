export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("username").notNullable().unique()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.boolean("isAdmin")
    table.boolean("isAuthor")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
