interface Paths {
  [key: string]: string;
}

export default {
  //Principais sem login
  HOME: "/",
  LOGIN: "/login",
  SIGIN: "/sigin",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  NOT_FOUND: "*",
  ABOUT: "/about",
  FAQ: "/faq",
  PAYMENT_TERMS: "/payment-terms",

  //Logado
  HOME_LOGGED: "/home",
  MY_ACCOUNT: '/my-account',
  NEW_HISTORY: '/new-history',
  MY_HISTORIES: '/my-histories',
  PRICING_PLANS: '/pricing-plans',

  //Admin
  INCOMES: '/incomes',
  TERMS: '/terms',
  USERS: '/users',
  CHAPTERS: '/chapters',
  QUESTIONS:'/questions',
  PLANS:'/plans',

} as Paths;