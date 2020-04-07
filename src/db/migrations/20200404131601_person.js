exports.up = function(knex, Promise) {
  return knex.schema.createTable('persons', (table) => {
    table.increments();
    table.string('rut');
    table.string('name');
    table.string('lastName');
    table.integer('age');
    table.string('course');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('persons');
};

