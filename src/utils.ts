export function buildAbsoluteUrl({ articleId }: { articleId: string }) {
  return `https://sojin.io/article/${articleId}`;
}

export function formatLocation(title: string) {
  return title.toLocaleLowerCase().replace(/\_/g, '-');
}
