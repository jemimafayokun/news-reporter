const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const request = require("supertest");
const jestSorted = require("jest-sorted");

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
        const endPointsObj = response.body.endPoints;
        expect(endPointsObj.hasOwnProperty("description"));
        expect(endPointsObj.hasOwnProperty("queries"));
        expect(endPointsObj.hasOwnProperty("exampleResponse"));
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("return a status code of 200 and response body with atricle from correct article id", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(3);
        expect(article.title).toBe("Eight pug gifs that remind me of mitch");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("icellusedkars");
        expect(article.body).toBe("some gifs");
        expect(article.created_at).toBe("2020-11-03T09:12:00.000Z");
        expect(article.votes).toBe(0);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("return a status code of 400 and sends error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });
  test("return a status code of 404 and responds with an appropriate error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/a")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/articles", () => {
  test("return a status code of 200 and response body with all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const allArticles = response.body.articles;
        expect(allArticles).toBeSortedBy("created_at", {
          descending: true,
        });
        expect(allArticles.length).toBe(13);
        allArticles.forEach((article) => {
        const expectedCreatedAt = new Date('2020-01-15T22:21:00.000Z');
          expect(article).toMatchObject({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String) 
          })
        });
      });
  });
});
