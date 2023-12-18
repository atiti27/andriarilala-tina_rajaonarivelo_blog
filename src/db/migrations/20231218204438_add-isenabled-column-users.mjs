export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.boolean("isEnabled").notNullable().defaultTo(true)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("isEnabled")
  })
}
