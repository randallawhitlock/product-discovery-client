export interface BlogPostFormData {
    title: string;
    content: string;
    summary: string;
    coverImage: string;
    tags?: string[];
    status?: 'draft' | 'published' | 'archived';
  }
