
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Phil", cohort_id: 1 },
        { name: "Jake", cohort_id: 2 },
        { name: "Bill", cohort_id: 2 },
        { name: "Mikaela", cohort_id: 1 },
        { name: "George", cohort_id: 2 }
      ]);
    });
};

