'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', function(table){
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('constacts');
};
