import * as React from 'react';
import { Link } from '../style/components';
import {
  Colors,
  Containers,
  Flex,
  Margins,
  Paddings,
  Sizes,
  Typography,
} from '../style/constants';

export default function Header() {
  return (
    <header>
      <div
        css={[
          Paddings.horizontal.medium,
          Flex.horizontal,
          Flex.spaceBetweenItems,
          Flex.alignItemsToCenter,
          Containers.wrap,
          { maxWidth: 1080, flexWrap: 'wrap' },
          Margins.vertical.regular,
        ]}
      >
        <HeaderLink
          href="/"
          css={[
            Margins.vertical.small,
            Margins.right.medium,
            {
              display: 'flex',
              fontSize: Sizes.regular,
              alignItems: 'center',
              lineHeight: 1,
            },
          ]}
        >
          <img
            src="https://static.sojin.io/images/leo.jpg"
            css={{
              width: '3rem',
              height: '3rem',
              borderRadius: '3rem',
            }}
          />
          <div css={Margins.left.small}>
            <div
              css={[
                Margins.bottom.xxSmall,
                {
                  color: Colors.text,
                  fontWeight: 700,
                },
              ]}
            >
              Sojin Park
            </div>
            <small
              css={{
                color: Colors.textSecondary,
              }}
            >
              Frontend Dev
            </small>
          </div>
        </HeaderLink>
        <nav css={Margins.vertical.small}>
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
        Margins.horizontalList.regular,
      ]}
    >
      {children}
    </Link>
  );
}
