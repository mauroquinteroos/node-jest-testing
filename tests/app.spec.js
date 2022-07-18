import request from "supertest";
import app from "../src/app";

describe("GET /tasks", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.status).toBe(200);
  });

  test("should respond with an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {
  describe("Given a title and description", () => {
    const newTask = {
      title: "Test Task",
      description: "Test Task Description",
    };

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.status).toBe(200);
    });

    test("should have a content-type: application/json", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respond with an task ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBeDefined();
      expect(response.body.description).toBeDefined();
    });
  });

  describe("when title and description is missing", () => {
    test("should respond with a 400 status code", async () => {
      const fields = [
        {},
        { title: "Test Task" },
        { description: "Test Task Description" },
      ];
      fields.forEach(async (body) => {
        const response = await request(app).post("/tasks").send(body);
        expect(response.status).toBe(400);
      });
    });
  });
});
