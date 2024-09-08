'use client';  // Ensures the component is client-side only
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
}

const page = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;  // Extract id from the URL

  useEffect(() => {
    if (id) {
      // Assuming your backend is on localhost:3001, adjust the API path if necessary
      axios.get(`http://localhost:3001/posts/${id}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.error("Error fetching post:", err));
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default page;