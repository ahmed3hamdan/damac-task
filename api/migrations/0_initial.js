/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable("user", table => {
    table.increments();
    table.text("email");
    table.binary("password");
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("book", table => {
    table.increments();
    table.text("name");
    table.text("imageUrl");
    table.text("author");
    table.integer("pages");
    table.double("price");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
  await knex.schema.dropTable("user");
  await knex.schema.dropTable("book");
};
