const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const assert = require("chai").assert;

//Asertion Style
chai.should();
chai.use(chaiHttp);

describe("Tasks API", () => {
  describe("GET /api/tasks", () => {
    //@GET ROUTE TEST
    it("It should GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("It should NOT GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/task")
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });
  });

  //@GET by ID test
  describe("GET /api/tasks/:id", () => {
    it("It should GET a task by id", (done) => {
      const taskId = 1;
      chai
        .request(server)
        .get(`/api/tasks/${taskId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("completed");
          assert.equal(taskId, 1);
          done();
        });
    });
    it("It should NOT GET a task by id", (done) => {
      const taskId = 123;
      chai
        .request(server)
        .get(`/api/tasks/${taskId}`)
        .end((err, response) => {
          response.should.have.status(404);
          assert.equal(
            response.text,
            "The task with the provided ID does not exist."
          );

          done();
        });
    });
  });

  //@POST ROUTE TEST
  describe("POST /api/tasks", () => {
    const task = { name: "Task4", completed: false };
    it("IT should POST", (done) => {
      chai
        .request(server)
        .post("/api/tasks")
        .send(task)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("completed").eq(false);
          done();
        });
    });

    it("IT should NOT POST a new task without name", (done) => {
      chai
        .request(server)
        .post("/api/tasks")
        .send({ completed: false })
        .end((err, response) => {
          response.should.have.status(400);
          assert.equal(response.text, "The name is required");
          done();
        });
    });
  });

  //@PUT ROUTE TEST
  describe("PUT /api/tasks/:id", () => {
    const taskID = 1;
    const task = { name: "Task 1 changed", completed: true };
    it("IT should update the TASK", (done) => {
      chai
        .request(server)
        .put(`/api/tasks/${taskID}`)
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("name").eq("Task 1 changed");
          response.body.should.have.property("completed").eq(true);
          done();
        });
    });

    it("IT should not update the TASK", (done) => {
      chai
        .request(server)
        .put(`/api/tasks/${taskID}`)
        .send({ completed: true })
        .end((err, response) => {
          response.should.have.status(400);
          assert.equal(response.text, "The name is required");
          done();
        });
    });
  });
  //@PATCH ROUTE TEST
  describe("PATCH /api/tasks/:id", () => {
    const taskID = 1;
    const task = { name: "Task 1 patch", completed: true };
    it("IT should update the TASK", (done) => {
      chai
        .request(server)
        .patch(`/api/tasks/${taskID}`)
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("name").eq("Task 1 patch");
          response.body.should.have.property("completed").eq(true);
          done();
        });
    });

    it("IT should not patch the TASK", (done) => {
      chai
        .request(server)
        .patch(`/api/tasks/${taskID}`)
        .send({ completed: true })
        .end((err, response) => {
          response.should.have.status(400);
          assert.equal(response.text, "The name is required");
          done();
        });
    });
  });
  //@DELETE ROUTE TEST
  describe("DELETE /api/tasks/:id", () => {
    const taskID = 1;
    it("IT should delete the TASK", (done) => {
      chai
        .request(server)
        .delete(`/api/tasks/${taskID}`)

        .end((err, response) => {
          response.should.have.status(200);

          done();
        });
    });
  });
});
