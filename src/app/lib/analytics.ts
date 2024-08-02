import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextApiRequest, NextApiResponse } from 'next';
import ReactGA from 'react-ga';

export const initGA = () => {
  const trackingID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-NSJYQRT54X';
  if (trackingID) {
    ReactGA.initialize(trackingID, { debug: true });
    console.log('Google Analytics initialized with ID:', trackingID);
  } else {
    console.warn('Google Analytics tracking ID not found.');
  }
};

export const logPageView = () => {
  const path = window.location.pathname + window.location.search;
  ReactGA.pageview(path);
  console.log('Page view logged for:', path);
};


