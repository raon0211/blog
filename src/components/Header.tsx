import React from 'react';
import { InternalLink } from 'style/components/internalLink';
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
    <header
      css={[
        Paddings.horizontal.medium,
        Flex.horizontal,
        Containers.wrap,
        { maxWidth: 1080, flexWrap: 'wrap' },
        Margins.vertical.regular,
      ]}
    >
      <HeaderMainLink
        href="/"
        imageUrl="https://static.sojin.io/images/leo.jpg"
        title="Sojin Park"
        description="Frontend Dev"
      />
      <nav css={Margins.vertical.small}>
        <HeaderLink href="/blog">끄적끄적</HeaderLink>
        <HeaderLink href="/articles">글뭉치</HeaderLink>
        <HeaderLink href="/about">소개</HeaderLink>
      </nav>
    </header>
  );
}

interface HeaderMainLinkProps {
  href: string;
  imageUrl: string;
  title: string;
  description: string;
}

function HeaderMainLink({
  href,
  imageUrl,
  title,
  description,
}: HeaderMainLinkProps) {
  return (
    <HeaderLink
      href={href}
      css={[
        Margins.vertical.small,
        Margins.right.medium,
        Flex.horizontal,
        {
          fontSize: Sizes.regular,
          lineHeight: 1,
        },
      ]}
    >
      <img
        src={imageUrl}
        css={{
          width: '3rem',
          height: '3rem',
          borderRadius: '3rem',
          backgroundColor: '#8e8270',
        }}
        alt="프로필 사진"
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
          {title}
        </div>
        <small
          css={{
            color: Colors.textSecondary,
          }}
        >
          {description}
        </small>
      </div>
    </HeaderLink>
  );
}

interface HeaderLinkProps {
  className?: string;
  href: string;
  children: React.ReactNode;
}

function HeaderLink({ className, href, children }: HeaderLinkProps) {
  return (
    <InternalLink
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
    </InternalLink>
  );
}
