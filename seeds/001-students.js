
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Matt', cohorts_id: '1'},
        {name: 'Dylan', cohorts_id: '3'},
        {name: 'rowValue3', cohorts_id: '2'}
      ]);
    });
};
