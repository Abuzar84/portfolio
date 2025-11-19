'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    
    w.dataLayer = w.dataLayer || [];
    
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };

    w.gtag('js', new Date());
    w.gtag('consent', 'default', {
      analytics_storage: 'allow',
      ad_storage: 'allow',
      ad_user_data: 'allow',
      ad_personalization: 'allow',
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