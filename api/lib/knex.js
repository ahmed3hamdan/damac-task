const config = require("./config");
const Knex = require("knex");
const bcrypt = require("bcrypt");

const knex = Knex({
  client: "pg",
  connection: config.PG_CONNECTION_STRING,
});

// run migrations
knex.migrate
  .latest()
  .then(([startingVersion]) => {
    console.log("migrations are up to date.");

    // create default username on first migration
    if (startingVersion === 1) {
      knex("user")
        .insert({
          email: config.INITIAL_USER_EMAIL,
          password: bcrypt.hashSync(config.INITIAL_USER_PASSWORD, 12),
        })
        .then(() => {
          console.log(
            `created default user with email "${config.INITIAL_USER_EMAIL}".`
          );
        });
    }
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

module.exports = knex;
