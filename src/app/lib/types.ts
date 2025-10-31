export interface CourseRes {
  id: number;
  courseName: string;
  courseCode: string;
   description: string;
  image?: string;
  lecturer?: {
    name: string;
    email: string;
  };
}

export interface CourseWithImage extends CourseRes {
  image: string;
}

export interface CourseGridProps {
  apiEndpoint: string;
  title?: string;
  limit?: number;
 linkPrefix?: string;
  onEdit?: (course: CourseRes) => void;
  onDelete?: (courseId: number) => void;
}


export interface Student {
  id: number;
  name: string;
  email: string;
}


export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  filePath: string;
  submissionDate: string;
  grade: number | null;
  feedback: string | null;
  status: string;
  student: Student;
  assignment: {
    title: string;
    course: { courseName: string };
    dueDate: string;
  };
}



export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  submissions: Submission[];
  course:Course
  status: string
}



export interface Lecturer {
  id: number;
  name: string;
  email: string;
}

export interface CourseRes {
  id: number;
  courseName: string;
  description: string;
  assignments: Assignment[];
}



export interface CourseRes {
  id: number;
  courseName: string;
  courseCode: string;
   description: string;
  image?: string;
  lecturer?: {
    name: string;
    email: string;
  };
}

export interface Students {
    id:number;
  name: string;
  email: string;
  phoneNumber: string;
  sex: string;
  age: string;
};



export interface deadline  {
  id: number
  courseId: number
  title: string
  description: string
  dueDate: string
  createdAt: string
  updatedAt: string
  course: Course
  submissions: Submission[]
  status: string
}

export interface Course {
  id: number
  courseName: string
  courseCode: string
  description: string
  lecturerId: number
  createdAt: string
  updatedAt: string
}




