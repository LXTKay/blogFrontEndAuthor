import { useEffect, useState } from 'react';
import BlogEntryPreview from './BlogEntryPreview';
import config from './config';
import './App.css'
import dummyContent from '../dummyContent.json';

function InitialView() {
  const [blogPosts, setblogPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(config.APIURL + "posts/", {
          mode: "cors",
          method: "GET"
        });

        if(!response.ok) {
          throw new Error(`Failed to fetch data \nResponse status: ${response.status}` );
        }

        const data = await response.json();
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
      <button type='button' onClick={newBlogPost}>New Blog Post</button>
      {blogEntries}
    </>
  )
}

export default InitialView;
