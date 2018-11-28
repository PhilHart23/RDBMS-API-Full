const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());



/////////////////////////////////////////////////////////////////ENDPOINTS//////////////////////////////////////////////////////////////////

// GET ALL COHORTS

server.get("/api/cohorts", (req, res) => {
    db("cohorts")
      .then(cohorts => res.status(200).json(cohorts))
      .catch(err => res.status(500).json(err));
  });


  // GET BY ID
  
  server.get("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db("cohorts")
      .where({ id: id })
      .then(name => res.status(200).json(name))
      .catch(err => res.status(500).json({ error: err }));
  });

  //POST
  
  server.post("/api/cohorts", (req, res) => {
      const cohort = req.body

      db("cohorts")
       .insert(cohort)
       .returning("id")
       .then(ids => {
           res.status(201).json(ids)
       })
       .catch(err => {
           res.status(500).json({ message: "Error Posting", err })
       })
  })

// UPDATE 

server.put("/api/cohorts/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db("cohorts")
      .where({ id: id })
      .update(changes)
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ error: err }));
  });

  //DELETE
  
  server.delete("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    db("cohorts")
      .where({ id: id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  
// GET ALL STUDENTS

server.get("/api/students", (req, res) => {
    db("students")
      .then(students => res.status(200).json(students))
      .catch(err => res.status(500).json(err));
  });



// GET STUDENT BY ID

server.get("/api/students/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db("students")
    .where({ id: id })
    .then(name => res.status(200).json(name))
    .catch(err => res.status(500).json({ error: err }));
});

//POST

server.post("/api/students", (req, res) => {
    const student = req.body;
    console.log(req.body);
  
    db("students")
      .insert(student)
      .returning("id")
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({ message: "Error inserting", err });
      });
  });
  

  //UPDATE

  server.put("/api/students/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db("students")
      .where({ id: id })
      .update(changes)
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ error: err }));
  });


  //DELETE 

  server.delete("/api/students/:id", (req, res) => {
    const { id } = req.params;
    db("students")
      .where({ id: id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  






server.listen(7000, () => console.log("\n== Port 7k ==\n"));