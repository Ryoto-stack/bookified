import { z } from 'zod';
import { MAX_FILE_SIZE, MAX_IMAGE_SIZE, ACCEPTED_PDF_TYPES } from './constants';

export const UploadSchema = z.object({
  bookFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'PDF file must be less than 50MB',
    })
    .refine((file) => !file || ACCEPTED_PDF_TYPES.includes(file.type), {
      message: 'Only PDF files are allowed',
    }),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, {
      message: 'Cover image must be less than 10MB',
    }),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  author: z
    .string()
    .min(1, 'Author name is required')
    .max(100, 'Author must be less than 100 characters'),
  voice: z.string().min(1, 'Voice is required'),
}).refine((data) => data.bookFile !== undefined, {
  message: "PDF file is required",
  path: ["pdfFile"],
});
