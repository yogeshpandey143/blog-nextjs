import React, { FormEvent } from 'react';

interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;  // Function to handle form submission
  title: string;  // Title of the blog post
  setTitle: (title: string) => void;  // Function to set title
  content: string;  // Content of the blog post
  setContent: (content: string) => void;  // Function to set content
}



  const Form: React.FC<FormProps> = ({ handleSubmit, title, setTitle, content, setContent }) => {
  return (
    <form
      onSubmit={handleSubmit} 
      className="space-y-4 mt-4"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write title for blog"
        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write description"
        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
        rows={5}
        required
      ></textarea>
      <button
        type="submit"  // This should be 'submit'
        className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 items-center focus:ring-teal-500 focus:ring-offset-2"
      >
        Post
      </button>
    </form>
  );
};

export default Form;