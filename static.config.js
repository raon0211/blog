import * as articleMarkdowns from './contents/articles/*.md';
import path from 'path';
import marked from 'marked';

export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  extensions: ['.ts', '.tsx'],
  getRoutes,
};

async function getRoutes() {
  const articles = await getArticles();
}

async function getArticles() {
  return Object.keys(articleMarkdowns);
}
