export interface ArticleEntity {
  id: string;
  title: string;
  summary?: string;
  category: string[];
  markdown: string;
  url: string;
  html: string;
  date?: Date;
  externalLinks: string[];
}
