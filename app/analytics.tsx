'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Google ka original code hi daal rahe hain – bilkul same as Google deta hai
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };

    w.gtag('js', new Date());
    w.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    w.gtag('config', 'G-9T2D933YZV', {
      anonymize_ip: true,
    });

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9T2D933YZV';
    document.head.appendChild(script);
  }, []);

  return null;
}