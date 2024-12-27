import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@zod/resolver';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';

const blogPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  coverImage: z.string().url('Must be a valid URL'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  initialData?: BlogPostFormData;
  onSubmit: (data: BlogPostFormData) => Promise<void>;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData,
  });

  const onFormSubmit = async (data: BlogPostFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      // Consider showing a toast notification or alert
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              id="title"
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
              {...field}
            />
          )}
        />
        {errors.title && (
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{errors.title.message}</AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Ok</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Content
        </label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <textarea
              id="content"
              rows={5}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                ${errors.content ? 'border-red-500 dark:border-red-500' : ''}`}
              {...field}
            />
          )}
        />
        {errors.content && (
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{errors.content.message}</AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Ok</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Summary
        </label>
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <textarea
              id="summary"
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                ${errors.summary ? 'border-red-500 dark:border-red-500' : ''}`}
              {...field}
            />
          )}
        />
        {errors.summary && (
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{errors.summary.message}</AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Ok</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div>
        <label
          htmlFor="coverImage"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Cover Image URL
        </label>
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <input
              id="coverImage"
              type="url"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                ${errors.coverImage ? 'border-red-500 dark:border-red-500' : ''}`}
              {...field}
            />
          )}
        />
        {errors.coverImage && (
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{errors.coverImage.message}</AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Ok</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Tags (comma separated)
        </label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <input
              id="tags"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              {...field}
              // Consider handling tag input more dynamically
            />
          )}
        />
        {/* Tag errors can be complex to display, consider custom handling */}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Status
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              {...field}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          )}
        />
        {errors.status && (
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{errors.status.message}</AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Ok</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;