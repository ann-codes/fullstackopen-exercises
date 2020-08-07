const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./api_blogTestHelper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const blogRouter = require("../controllers/blogs");

describe("testing connection", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    let blogSave = new Blog(helper.initBlogs[0]);
    await blogSave.save();

    blogSave = new Blog(helper.initBlogs[1]);
    await blogSave.save();
  });

  it("returns as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("the blog posts has an identifier proprty named 'id'", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initBlogs.length);
  });

  test("the first blog's author is Ann", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].author).toBe("Ann");
  });

  test("there are now 3 blogs", async () => {
    let blogSave = new Blog(helper.addBlog1);
    await api.post("/api/blogs").send(blogSave).expect(200);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initBlogs.length + 1);
  });

  test("if likes is missing from the req, default to 0", async () => {
    // test that setting defaults at the schema level works
    expect(helper.addBlog2.likes).toBe(undefined);
    let blogSave = new Blog(helper.addBlog2);
    await api.post("/api/blogs").send(blogSave).expect(200);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs[helper.initBlogs.length].likes).toBe(0);
  });

  test.only("if title or url is missing from the req, get 400 error", async () => {
    expect(helper.addBlog3.title).toBe(undefined);
    expect(helper.addBlog3.url).toBe(undefined);
    let blogSave = new Blog(helper.addBlog3);
    await api.post("/api/blogs").send(blogSave).expect(400);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
