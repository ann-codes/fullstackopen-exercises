const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./api_blogTestHelper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const blogRouter = require("../controllers/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});

  // // can put into loop
  // let blogSave = new Blog(helper.initBlogs[0]);
  // await blogSave.save();

  // blogSave = new Blog(helper.initBlogs[1]);
  // await blogSave.save();

  // // tests fail occasionally due to async save issues
  // helper.initBlogs.forEach(async (blog) => {
  //   let blogSave = new Blog(blog);
  //   await blogSave.save();
  // });

  // using Promise.all()
  const blogsObj = helper.initBlogs.map((blog) => new Blog(blog));
  const blogsArr = blogsObj.map((blog) => blog.save());
  await Promise.all(blogsArr);
});

describe("verifying initialization of tests", () => {
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
});

describe("verifying api calls", () => {
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

  test("if title or url is missing from the req, get 400 error", async () => {
    expect(helper.addBlog3.title).toBe(undefined);
    expect(helper.addBlog3.url).toBe(undefined);
    let blogSave = new Blog(helper.addBlog3);
    await api.post("/api/blogs").send(blogSave).expect(400);
  });

  test("fails 400 id to delete is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });

  test("succeeds with 204 code if successfully deleted", async () => {
    const toDelete = await helper.blogsInDb();
    await api.delete(`/api/blogs/${toDelete[0].id}`).expect(204);
  });

  test("fails 400 id to update is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.put(`/api/blogs/${invalidId}`, {}).expect(400);
  });

  test("succeeds with 200 code if successfully updated", async () => {
    const toUpdate = await helper.blogsInDb();
    const changeObj = { ...toUpdate[0], likes: 1000000 };
    await api.put(`/api/blogs/${toUpdate[0].id}`, changeObj).expect(200);
    // calling an blogsInDb in async more than once will not work for testing
  });
});

afterAll(() => {
  mongoose.connection.close();
});
