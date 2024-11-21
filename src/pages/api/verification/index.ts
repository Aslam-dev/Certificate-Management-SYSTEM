import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    // Validate 'code' parameter
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Invalid verify' });
    }
    
    console.log('Received code:', code); // Log to check if 'code' is passed correctly

    try {
      // Query the database for student by studentCode or certificateId
      const student = await prisma.student.findFirst({
        where: {
          OR: [
            { studentCode: code },
            { certificateId: code },
          ],
        },
      });
    
      // If no student is found, return a 404 error
      if (!student) {
        console.log('Student not found for code:', code);
        return res.status(404).json({ error: 'Student not found' });
      }
    
      // If student is found, return the student data
      res.status(200).json(student);
    } catch (error) {
      // Log the error and return a 500 Internal Server Error if something goes wrong
      console.error('Error fetching student:', error);
      return res.status(500).json({ error: 'Failed to fetch student', details: error.message });
    }
    
  } else {
    // Handle invalid HTTP methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
