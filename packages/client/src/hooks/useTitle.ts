import { useEffect } from 'react';

export default function useTitle(pageTitle?: string) {
  const siteTitle = 'Bingo - np-bingo';
  useEffect(() => {
    pageTitle
      ? (document.title = `${pageTitle} ${siteTitle}`)
      : (document.title = siteTitle);
  });
}
