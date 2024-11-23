// pages/api/students/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

// Disable Next.js's default body parser for this API route
export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};

// Multer middleware for file upload
const uploadMiddleware = upload.single('photo');

// Mark the handler function as async
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Use multer to handle the file upload
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      const { firstName, lastName, nationality, studentCode, certificateId, course, results, graduationYear } = req.body;

      // If a new photo is uploaded, get the new file path
      const newPhoto = req.file ? `/uploads/${req.file.filename}` : null;

      try {
        // Fetch the existing student data to preserve the current photo if no new photo is uploaded
        const existingStudent = await prisma.student.findUnique({
          where: { id: Number(id) },
        });

        // If no new photo is uploaded, keep the existing photo URL
        const photo = newPhoto ? newPhoto : existingStudent?.photo;

        // Update student data in the database
        const student = await prisma.student.update({
          where: { id: Number(id) },
          data: {
            firstName,
            lastName,
            nationality,
            studentCode,
            certificateId,
            course,
            results,
            graduationYear: parseInt(graduationYear, 10),
            photo, // Use the new photo if uploaded, otherwise keep the existing photo
          },
        });

        // Respond with updated student
        res.status(200).json(student);
      } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await prisma.student.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Failed to delete student' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
