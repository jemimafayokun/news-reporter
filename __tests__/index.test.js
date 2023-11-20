const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  db.end();
});

describe("GET /api/healthcheck", () => {
  test("responds with a 200 status code", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe("GET /api/topics", () => {
  test("return a status code of 200 and response body with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const allTopics = response.body.topics;
        expect(allTopics.length).toBe(3);
        allTopics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
  test("return a status code of 404 for a route that does not exist", () => {
    return request(app).get("/api/pictures").expect(404);
  });
});

describe("GET /api", () => {
  test("return a status code of 200 and response body with an object describing all the available endpoints on the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointsObj = response.body.endPoints
          expect(endPointsObj.hasOwnProperty('description'))
          expect(endPointsObj.hasOwnProperty('queries'))
          expect(endPointsObj.hasOwnProperty('exampleResponse'))
      });
  });
});
