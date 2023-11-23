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
  test("return a status code of 404 and sends error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });
  test("return a status code of 400 and responds with an appropriate error message when given an invalid id", () => {
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
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("returns a status code of 201 and response body with posted comment", () => {
    return request(app)
      .post("/api/articles/7/comments")
      .send({
        username: "icellusedkars",
        body: "some interesting stuff",
      })
      .expect(201)
      .then((response) => {
        const comment = response.body.comment;
        const createdAt = comment.created_at;
        expect(comment).toEqual({
          comment_id: 19,
          body: "some interesting stuff",
          article_id: 7,
          author: "icellusedkars",
          votes: 0,
          created_at: createdAt,
        });
      });
  });
  test("returns a status code of 404 and sends error message when given a valid but non-existent id", () => {
    return request(app)
      .post("/api/articles/99/comments")
      .send({
        username: "icellusedkars",
        body: "some interesting stuff",
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });
  test("return a status code of 400 and responds with an appropriate error message when given an invalid id", () => {
    return request(app)
      .post("/api/articles/a/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("return status code of 200 and responds with updated article with votes incremented by positive inc_votes value", () => {
    return request(app)
      .patch("/api/articles/7")
      .send({ inc_votes: 10 })
      .expect(200)
      .then((response) => {
        const updatedArticle = response.body.article;
        expect(updatedArticle).toEqual({
          article_id: 7,
          title: "Z",
          topic: "mitch",
          author: "icellusedkars",
          body: "I was hungry.",
          created_at: "2020-01-07T14:08:00.000Z",
          votes: 10,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("return status code of 200 and responds with updated article with votes decremented by negative inc_votes value", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -30 })
      .expect(200)
      .then((response) => {
        const updatedArticle = response.body.article;
        expect(updatedArticle).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 70,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("returns a status code of 404 and sends error message when given a valid but non-existent id", () => {
    return request(app)
      .patch("/api/articles/99")
      .send({ inc_votes: -30 })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });
  test("return a status code of 400 and responds with an appropriate error message when given an invalid id", () => {
    return request(app)
      .patch("/api/articles/a")
      .send({ inc_votes: -30 })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("return a status code of 204 and no content", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });
  test("return a status code of 404 and sends error message when given a valid but non-existent i", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("comment does not exist");
      });
  });

  test("return a status code of 400 and responds with an appropriate error message when given an invalid id", () => {
    return request(app)
      .delete("/api/comments/a")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/users", () => {
  test("return a status code of 200 and responds with an array of all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const allUsers = body.users;
        expect(allUsers.length).toBe(4);
        allUsers.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/articles (topic query)", () => {
  test("returns a status 200 and responds with  filters the articles by the topic value specified in the query.", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const filteredByTopic = body.articles;
        expect(filteredByTopic.length).toBe(12);
        filteredByTopic.forEach((article) => {
          expect(article.topic).toBe("mitch");
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("returns a status 200 and responds with empty array when topic exists but no related article", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        const filteredByTopic = body.articles;
        expect(filteredByTopic).toEqual([]);
      });
  });
  test("returns a status code of 404 and sends error message when given a valid but non-existent topic", () => {
    return request(app)
      .get("/api/articles?topic=dogs")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
});

describe("GET /api/articles/:article_id (comment_count)", () => {
  test("returns a status code of 200 and responds with an article object which also includes comment count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const articleWithCommentCount = body.article;
        expect(articleWithCommentCount).toMatchObject({
          article_id: 1,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: "11",
        });
      });
  });
});
