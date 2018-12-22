import * as React from 'react';
import {
  Paddings,
  Flex,
  Typography,
  Sizes,
  Margins,
  Borders,
} from '../style/constants';
import { Heading } from '../style/components';

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
      <Heading
        css={[Margins.vertical.none, Paddings.bottom.none, Borders.none]}
      >
        Jin
      </Heading>
      <nav>
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
    <a
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
    </a>
  );
}
