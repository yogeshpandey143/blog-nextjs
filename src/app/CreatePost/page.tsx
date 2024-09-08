'use client';

import React, { FormEvent, useState } from 'react';
import { BackgroundBeams } from '@/Components/ui/background-beams';

function Page() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted:', { title, desc });
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-500 py-12 pt-36 relative">
      {' '}
 
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
    
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        {' '}
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-black">
          Create Post
        </h1>
     
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write title for blog"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            required
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="write description"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 items-center  focus:ring-teal-500 focus:ring-offset-2"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;