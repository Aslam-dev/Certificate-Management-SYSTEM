// src/pages/api/students/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

const uploadMiddleware = upload.single('photo');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        res.status(500).json({ error: 'File upload failed' });
        return;
      }

      const {
        firstName,
        lastName,
        nationality,
        studentCode,
        certificateId,
        course,
        results,
        graduationYear,
      } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;

      try {
        const student = await prisma.student.create({
          data: {
            firstName,
            lastName,
            nationality,
            studentCode,
            certificateId,
            course,
            results,
            graduationYear: parseInt(graduationYear, 10), // Ensure graduationYear is an integer
            photo,
          },
        });
        res.status(201).json(student);
      } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student' });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const students = await prisma.student.findMany();
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to allow multer to handle it
  },
};



export default handler;
