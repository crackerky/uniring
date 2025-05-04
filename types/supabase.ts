export type Photo = {
  id: string;
  filename: string;
  file_size: number;
  file_type: string;
  title: string;
  category: string;
  date: string;
  url: string;
  created_at: string;
  user_id: string | null;
};