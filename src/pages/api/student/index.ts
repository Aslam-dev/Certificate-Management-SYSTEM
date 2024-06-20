import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { studentCode } = req.query;

    // Validate studentCode
    if (!studentCode || typeof studentCode !== 'string') {
      return res.status(400).json({ error: 'Invalid student code' });
    }

    try {
      const student = await prisma.student.findFirst({
        where: {
          studentCode: studentCode.toString(),
        },
      });

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'Failed to fetch student' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

