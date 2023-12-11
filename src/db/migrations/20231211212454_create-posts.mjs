export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content")
    table.integer("user_id").notNullable()
    table.foreign("user_id").references("id").inTable("users")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}
