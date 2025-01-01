export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  displayProperty?: 'title' | 'userId' | 'id' | 'body';
}
