const FRONTEND_DEV_URLS = [
  'http://localhost:8080',
  'https://graceshopper2020mushroom.herokuapp.com/'
]
const FRONTEND_PROD_URLS = [
  'http://localhost:8080',
  'https://graceshopper2020mushroom.herokuapp.com/'
]
module.exports =
  process.env.NODE_ENV === 'production' ? FRONTEND_PROD_URLS : FRONTEND_DEV_URLS

///whitelisting for CORS
