import axios from 'axios';


const instance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1', // Replace with your API base URL
  baseURL: "https://vidflare2.onrender.com/api/v1", // production
  withCredentials: true
});

// axiosCookieJarSupport(axios);

// const cookieJar=new CookieJar();
// const client = axios.create({
//   jas: cookieJar,
//   withCredentials: true
// })
export default instance;
