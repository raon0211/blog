declare module '@reach/router' {
  interface LinkProps extends React.ClassAttributes<HTMLAnchorElement> {
    to: string;
    activeClassName?: string;
    activeStyle?: string;
    prefetch?: boolean | 'data' | 'template';
    scrollToTop?: boolean;
  }

  export class Link extends React.Component<LinkProps> {}

  export function navigate(path: string): void;
}
