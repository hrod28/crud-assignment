'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contacts').insert({
          id: 1,
          first_name: 'Laura',
          last_name: 'Too Cool'
        })

      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts))");
    });
};
