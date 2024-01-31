export const up = async (db) => {
  await db.schema.createTable("postsViews", (table) => {
    table.increments("id")
    table.integer("postId").notNullable()
    table
      .foreign("postId")
      .references("id")
      .inTable("posts")
      .onUpdate("cascade")
      .onDelete("cascade")
    table.integer("userId").notNullable()
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onUpdate("cascade")
      .onDelete("cascade")
    table.timestamps(true, true, true)
    table.unique(["postId", "userId"])
  })
}

export const down = async (db) => {
  await db.schema.dropTable("postsViews")
}
