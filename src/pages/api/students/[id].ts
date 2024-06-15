// pages/api/students/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { firstName, lastName, nationality, studentCode, certificateId, course, results, graduationYear, photo } = req.body;

    try {
      const student = await prisma.student.update({
        where: { id: Number(id) },
        data: { firstName, lastName, nationality, studentCode, certificateId, course, results, graduationYear, photo },
      });
      res.status(200).json(student);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Failed to update student' });
    }
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
