import { Link } from '@reach/router';
import { Typography } from 'style/constants';

export const linkCss = [Typography.internalLink];

interface LinkProps {
  className?: string;
  children: React.ReactNode;
  href: string;
}

export function InternalLink({ href, ...props }: LinkProps) {
  return <Link to={href} css={linkCss} {...props} />;
}
