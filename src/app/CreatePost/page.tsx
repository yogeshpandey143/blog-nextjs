'use client';  // Ensures the component runs only on the client side

import React, { useState } from 'react';
import { BackgroundBeams } from '@/Components/ui/background-beams';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Change to 'next/navigation' for Next.js 13+ if you're using App Router
import Form from '@/Components/Form';

function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.post('https://blog-nextjs-backend-a7p1.onrender.com', { title, content })
    .then(() => {
      router.push('/ViewList');
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-500 py-12 pt-36 relative">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Create Post
        </h1>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
          <Form 
            handleSubmit={handleSubmit} 
            title={title} 
            setTitle={setTitle} 
            content={content} 
            setContent={setContent} 
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
