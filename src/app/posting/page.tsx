'use client';

import { useState, useEffect } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string; // Optional image field
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [updateId, setUpdateId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async () => {
    if (!title || !content || !image) {
      alert('Title, content, and image are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to add post');
      }
      const newPost = await res.json();
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async (id: number) => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image); // Only append if a new image is provided
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await res.json();
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      setUpdateId(null);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto font-sans p-5">
      <h1 className="text-center text-2xl font-bold text-gray-600 dark:text-white mb-8">
        Simple CRUD App with Prisma and MySQL
      </h1>

      {/* Form Section */}
      <div className="mb-5 flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-3 text-lg border text-gray-600 dark:text-black border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="p-3 text-lg border text-gray-600 dark:text-black border-gray-300 rounded-md"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="p-3 text-lg border text-gray-600 dark:text-white border-gray-300 rounded-md"
        />
        <button
          onClick={updateId ? () => updatePost(updateId) : addPost}
          className="p-3 text-lg bg-blue-600 text-gray-600 dark:text-white rounded-md hover:bg-blue-700"
        >
          {updateId ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Posts List Section */}
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border border-gray-300 rounded-lg mb-3 p-4 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
              {post.title}
            </h2>
            <p className=" mb-2 text-gray-600 dark:text-white">
              {post.content}
            </p>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-24 rounded-md mb-3"
              />
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setUpdateId(post.id);
                  setTitle(post.title);
                  setContent(post.content);
                  setImage(null);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="px-4 py-2 bg-red-500  text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
