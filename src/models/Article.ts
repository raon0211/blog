export interface ArticleEntity {
  id: string;
  title: string;
  category: string[];
  markdown: string;
  html: string;
  date: Date;
  linkedArticleIds: string[];
}
