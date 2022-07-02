/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable("user", table => {
    table.increments();
    table.string("email");
    table.binary("password");
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("book", table => {
    table.increments();
    table.string("name");
    table.string("imageUrl");
    table.string("author");
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
