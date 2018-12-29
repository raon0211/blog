import * as React from 'react';
import {
  Paddings,
  Flex,
  Typography,
  Sizes,
  Margins,
  Borders,
} from '../style/constants';
import { Heading, headingCss, Link } from '../style/components';

export default function Header() {
  return (
    <header
      css={[
        Paddings.top.medium,
        Paddings.horizontal.medium,
        Flex.horizontal,
        Flex.spaceBetweenItems,
        Flex.alignItemsToCenter,
      ]}
    >
      <Link
        href="/"
        css={[
          headingCss,
          Margins.vertical.none,
          Paddings.bottom.none,
          Borders.none,
          { textDecoration: 'none' },
        ]}
      >
        Jin
      </Link>
      <nav>
        <HeaderLink href="/blog">끄적끄적</HeaderLink>
        <HeaderLink href="/articles">글뭉치</HeaderLink>
        <HeaderLink href="/about">소개</HeaderLink>
      </nav>
    </header>
  );
}

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

function HeaderLink({ href, children }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      css={[
        Typography.text,
        {
          textDecoration: 'none',
        },
        Margins.horizontalList.regular,
      ]}
    >
      {children}
    </Link>
  );
}
