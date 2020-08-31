# Async Await Notes: 

### Using async await w/ useEffect

in `services/blogs.js`:

```javascript
import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// it appears to still work with the originally written promise chain above
// so below may not be needed
const getAllAA = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

export default { getAll, getAllAA };
```

In `App.js` using useEffect to call blogs API and set data

```javascript
// ============ their original way (modified)
useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
}, []);

// ============ my old preferred way
const getAllBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
};
useEffect(getAllBlogs, []);

// ============ using async/await
const getBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
};
useEffect(() => {
    getBlogs();
}, []);

// ============ using async/await w/ IIFE
useEffect(() => {
    (async function fetchData() {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
    })();
}, []);
```

remember straight => means return, and you do not want to return it necessarily, just call the API and set it. 