'use client';
import { Suspense, useEffect, useState } from 'react';
import {  useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
}

const PageContent = () => {
  const [post, setPost] = useState<Post | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
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

const Page = () => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
