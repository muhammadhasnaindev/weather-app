import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Weather App',
      search: 'Search',
      enterCity: 'Enter City Name',
      humidity: 'Humidity',
      wind: 'Wind',
      forecast: '5-Day Forecast'
    },
  },
  ur: {
    translation: {
      title: 'موسم کی ایپ',
      search: 'تلاش کریں',
      enterCity: 'شہر کا نام درج کریں',
      humidity: 'نمی',
      wind: 'ہوا',
      forecast: '5 دن کی پیش گوئی'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;