// src/pages/api/students/index.ts

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const studentId = req.query.id; // Assuming your API route is /api/students/[id]

  if (req.method === 'POST' || req.method === 'PUT') {
    // Middleware for handling multipart form data
    upload.single('photo')(req, res, async (error: any) => {
      if (error) {
        console.error('Multer error:', error);
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
        let student;

        if (req.method === 'POST') {
          // Create a new student
          student = await prisma.student.create({
            data: {
              firstName,
              lastName,
              nationality,
              studentCode,
              certificateId,
              course,
              results,
              graduationYear: parseInt(graduationYear, 10), // Convert to integer
              photo,
            },
          });
        } else if (req.method === 'PUT') {
          // Update an existing student
          student = await prisma.student.update({
            where: { id: Number(studentId) },
            data: {
              firstName,
              lastName,
              nationality,
              studentCode,
              certificateId,
              course,
              results,
              graduationYear: parseInt(graduationYear, 10), // Convert to integer
              photo,
            },
          });
        }

        res.status(200).json(student);
      } catch (error) {
        console.error(`Error ${req.method === 'POST' ? 'creating' : 'updating'} student:`, error);
        res.status(500).json({ error: `Failed to ${req.method === 'POST' ? 'create' : 'update'} student` });
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
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to allow multer to handle it
  },
};
