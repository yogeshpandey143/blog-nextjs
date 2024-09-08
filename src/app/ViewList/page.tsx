
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/Components/ui/3d-card";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);  // State to hold the list of posts

  // Fetch posts when the component loads
  useEffect(() => {
    axios.get('http://localhost:3001/posts')  // Use the correct URL for your backend API
      .then((res) => {
        setPosts(res.data);  // Ensure you're setting posts directly from the response data
      })
      .catch((error) => {
        console.error("There was an error fetching the posts:", error);
      });
  }, []);

  // Function to delete a post by ID
  const deletePost = (id: number) => {
    axios.delete(`http://localhost:3001/posts/${id}`)  // Use the correct URL for deleting posts
      .then(() => {
        // Remove the post from the state
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the post:", error);
      });
  };

  return (
    <div className="min-h-screen bg-black py-12 pt-36">
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">All Blogs ({posts.length})</h1>  
      <div className="flex flex-wrap justify-center">
        {posts.length === 0 ? (
          <p className="text-white">No posts available</p>
        ) : (
          posts.map((post) => (
            <CardContainer className="inter-var m-4" key={post.id}>
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {post.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {post.content}
                </CardItem>
        
                <div className="flex justify-between items-center mt-20">
                  <Link href={`/ViewPost/${post.id}`}>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl text-xs font-normal  bg-black dark:bg-white dark:text-black text-white "
                    >
                      View Post →
                    </CardItem>
                  </Link>
        
                  <CardItem
                    translateZ={20}
                    as="button"
                    onClick={() => deletePost(post.id)}  // Hook up the delete button to call the deletePost function
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    Delete Blog
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))
        )}
      </div>  
    </div>
  );
};

export default Page;
