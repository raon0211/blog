import * as React from 'react';
import {
  Paddings,
  Flex,
  Typography,
  Sizes,
  Margins,
  Borders,
  Containers,
  Colors,
} from '../style/constants';
import { Heading, headingCss, Link } from '../style/components';

export default function Header() {
  return (
    <header css={Borders.bottom}>
      <div
        css={[
          Paddings.vertical.small,
          Paddings.horizontal.medium,
          Flex.horizontal,
          Flex.spaceBetweenItems,
          Flex.alignItemsToCenter,
          Containers.wrap,
        ]}
      >
        <HeaderLink
          href="/"
          css={{ fontSize: Sizes.medium, color: Colors.text }}
        >
          Jin
        </HeaderLink>
        <nav>
          <HeaderLink href="/blog">끄적끄적</HeaderLink>
          <HeaderLink href="/articles">글뭉치</HeaderLink>
          <HeaderLink href="/about">소개</HeaderLink>
        </nav>
      </div>
    </header>
  );
}

interface HeaderLinkProps {
  className?: string;
  href: string;
  children: React.ReactNode;
}

function HeaderLink({ className, href, children }: HeaderLinkProps) {
  return (
    <Link
      className={className}
      href={href}
      css={[
        Typography.text,
        {
          fontFamily: 'Noto Sans KR',
          fontSize: '0.95rem',
          textDecoration: 'none',
          color: Colors.textSecondary,
        },
        Margins.horizontalList.large,
      ]}
    >
      {children}
    </Link>
  );
}
