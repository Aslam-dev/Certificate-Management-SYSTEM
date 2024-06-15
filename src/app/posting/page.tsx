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
      formData.append('image', image);
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
      setPosts(posts.map(post => post.id === id ? updatedPost : post));
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
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Simple CRUD App with Prisma and MySQL</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={updateId ? () => updatePost(updateId) : addPost}>
        {updateId ? 'Update' : 'Add'}
      </button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} width="100" />}
            <button onClick={() => { setUpdateId(post.id); setTitle(post.title); setContent(post.content); setImage(null); }}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
