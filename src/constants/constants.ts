export const ANNOUNCEMENT_TEXTS = {
  seasonalSale: {
    text: ['Seasonal savings are here! Shop our bestsellers before they are gone!']
  },
  heroPromo: {
    label: 'Your shoes say a lot about you — and at StepUp, we help you say it louder.',
    text: [
      'Explore a curated selection of sneakers that reflect your energy, ambitions, and personal style.',
      'From bold colors to sleek silhouettes, every pair in our store is chosen to support your individuality, performance, and everyday comfort.'
    ]
  },
  socialCall: {
    label: 'Let’s Get Social!',
    text: [
      'Sneaker inspo, styling tips, and cool community vibes — connect with us on your favorite platforms.'
    ],
    socials: true
  }
};

export const BRAND_LOGOS = [
  'asics.png',
  'converse.png',
  'ellesse.png',
  'lacoste.png',
  'new-balance.png',
  'nike.png',
  'puma.png'
];

export const SOCIAL_LOGOS = [
  'youtube.png',
  'facebook.png',
  'instagram.png',
  'pinterest.png',
  'twitter.png'
];

export const TOKEN_AUTH_INFO = `
Уважаемый проверяющий!

[INFO] Это приложение создано с использованием Next.js (App Router).

Access token от Commercetools запрашивается на сервере через API Route (/api/auth/login) с использованием SDK Commercetools. 
SDK автоматически отправляет запрос к /customers/token, после чего токен сохраняется в HttpOnly cookie для безопасного использования.

Поскольку запрос выполняется на серверной стороне, он не отображается во вкладке Network.
Проверить наличие токена можно во вкладке Application → Cookies → [домен].`;
