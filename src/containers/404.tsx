import React, { useEffect } from 'react';
import { Title } from 'style/components';
import { Router, navigate } from '@reach/router';
import { formatLocation } from 'utils';

export default function NotFound() {
  useEffect(() => {
    const path = location.pathname;

    if (isPreviouslyValidPath(path)) {
      navigate(formatLocation(path), {
        replace: true,
      });
    } else {
      navigate('/', {
        replace: true,
      });
    }
  }, []);

  return null;
}

function isPreviouslyValidPath(path: string) {
  return path.match(/[A-Z]/) || path.includes('_');
}
