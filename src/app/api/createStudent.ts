// pages/api/createStudent.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

interface StudentInput {
  firstName: string;
  lastName: string;
  nic: string;
  photo?: string;
  courses: {
    courseId: number; // Assuming courseId is a unique identifier for each course
    subjects: {
      subjectId: number; // Assuming subjectId is a unique identifier for each subject
      result: string;
    }[];
  }[];
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, nic, photo, courses }: StudentInput = req.body;

      // Create student record
      const student = await prisma.student.create({
        data: {
          firstName,
          lastName,
          nic,
          photo,
        },
        include: {
          courses: {
            include: {
              subjects: true,
            },
          },
        },
      });

      // Add courses and subjects
      for (const course of courses) {
        const { courseId, subjects } = course;
        await prisma.studentToCourse.create({
          data: {
            courseId,
            studentId: student.id,
            subjects: {
              create: subjects.map((subject) => ({
                ...subject,
                courseId,
              })),
            },
          },
        });
      }

      res.status(201).json(student);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
