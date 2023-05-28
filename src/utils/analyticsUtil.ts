export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

export const fbEvent = (name, options = {}) => {
  window.fbq('track', name, options);
};

export const gtagEvent = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Export the utility functions as an object
const AnalyticsUtil = {
  gtagEvent,
  fbEvent,
};

export default AnalyticsUtil;
