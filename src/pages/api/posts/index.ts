// src/pages/api/posts/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

// Set up multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Middleware for handling multipart form data
    upload.single('image')(req, res, async (error: any) => {
      if (error) {
        console.error('Multer error:', error);
        res.status(500).json({ error: 'File upload failed' });
        return;
      }
      
      const { title, content } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      try {
        const post = await prisma.post.create({
          data: { title, content, image },
        });
        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to allow multer to handle it
  },
};
