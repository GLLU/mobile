import { Platform } from 'react-native';

export const SUPPORT_EMAIL = 'hello@gllu.com';
export const EMAIL_URL = `mailto:${SUPPORT_EMAIL}`;
export const TERMS_URL = 'https://www.infash.com/terms';
export const PRIVACY_URL = 'https://www.infash.com/privacy';
export const COPYRIGHT_URL = 'https://www.infash.com/copyrights';
export const RATE_US_URL = Platform.OS === 'ios' ?
  'https://itunes.apple.com/us/app/infash-style-fashion-that-fits-your-body-shape/id1252344281?mt=8' :
  'https://play.google.com/store/apps/details?id=com.infash.release';
export const LOOK_STATES = {
  DRAFT: 'draft',
  PUBLISHED: 'published'
};
