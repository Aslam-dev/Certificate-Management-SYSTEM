import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Logs Prisma queries and errors for debugging
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Retrieve all courses
      const courses = await prisma.course.findMany();
      return res.status(200).json(courses);
    }

    if (req.method === 'POST') {
      const { name, startDate, endDate, batchNo } = req.body;

      if (!name || !startDate || !endDate || !batchNo) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Ensure batchNo is an integer
      const batchNoInt = parseInt(batchNo, 10);
      if (isNaN(batchNoInt)) {
        return res.status(400).json({ message: 'Invalid batch number' });
      }

      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }

      if (parsedStartDate > parsedEndDate) {
        return res.status(400).json({
          message: 'Start date cannot be after end date',
        });
      }

      const createdCourse = await prisma.course.create({
        data: {
          name,
          startDate: parsedStartDate,
          endDate: parsedEndDate,
          batchNo: batchNoInt, // Pass batchNo as an integer
        },
      });

      return res.status(201).json({
        message: 'Course created successfully',
        course: createdCourse,
      });
    }

    // If method is not GET or POST
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error handling request:', error);

    res.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
