// src/pages/api/posts/[id].ts

import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

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

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to allow multer to handle it
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'PUT') {
    // Middleware for handling multipart form data
    upload.single('image')(req, res, async (error: any) => {
      if (error) {
        console.error('Multer error:', error);
        return res.status(500).json({ error: 'File upload failed' });
      }

      const { title, content } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      // Ensure the post exists
      const existingPost = await prisma.post.findUnique({ where: { id: Number(id) } });
      if (!existingPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Update post logic
      try {
        const updatedPost = await prisma.post.update({
          where: { id: Number(id) },
          data: {
            title,
            content,
            image: image || existingPost.image, // Keep old image if not updated
          },
        });
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
      }
    });
  } else if (method === 'DELETE') {
    // Delete post logic
    try {
      const deletedPost = await prisma.post.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
