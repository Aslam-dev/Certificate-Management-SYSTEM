import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name,  startDate,
        endDate,
        batchNo, } = req.body;

    // Use Prisma client to create a new course
    const createdCourse = await prisma.course.create({
      data: {
        name,
        startDate,
        endDate,
        batchNo,
      },
    });

    res.status(201).json({ message: 'Course created successfully', course: createdCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default createCourse;
