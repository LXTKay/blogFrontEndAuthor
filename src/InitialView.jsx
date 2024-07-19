import { useEffect, useState, useContext } from 'react';
import BlogEntryPreview from './BlogEntryPreview';
import config from './config';
import './App.css'
import makeDatePretty from "./makeDatePretty";
import getAuthCookie from './getAuthCookie';
import Context from './context';

function InitialView() {
  const [blogPosts, setblogPosts] = useState([]);
  const {loggedIn, setLoggedIn} = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchOptions = {
          mode: "cors",
          method: "GET"
        };

        const authCookie = getAuthCookie();
        if(authCookie) fetchOptions.headers = { "Authorization": authCookie };

        const response = await fetch(config.APIURL + "posts/", fetchOptions);

        if(!response.ok) {
          throw new Error(`Failed to fetch data \nResponse status: ${response.status}` );
        }

        const data = await response.json();
        data.map(post => post.timestamp = makeDatePretty(post.timestamp));
        setblogPosts(data);

      } catch(error) {
        console.log(error)
        setblogPosts([
          {
            id: "dummyID",
            title: error.name,
            content: error.message,
            isPublished: true,
            date: Date.now(),
          }
        ]);
        return;
      }
    };
    fetchData();
  }, []);

  const blogEntries = blogPosts.map((post) => {
    return <BlogEntryPreview
      title={post.title}
      content={post.content}
      date={post.timestamp}
      key={post._id}
      id={post._id}
    />
  });

  function newBlogPost() {
    window.location.href = "/createBlogPost";
  };

  return (
    <>
      {loggedIn && <button type='button' onClick={newBlogPost}>New Blog Post</button>}
      {blogEntries}
    </>
  )
}

export default InitialView;
