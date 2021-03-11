const routes = {
  auth: '/',
  registration: '/registration',
  reset: '/reset',
  confirm: '/confirm',
  activation: '/activation/:token',
  resetPassword: '/reset-password/:token',
  companies: '/app/companies',
  company: '/app/companies/company/:id',
  companyNew: '/app/companies/new',
  companyEdit: '/app/companies/edit/:id',
  companySearch: '/app/search-company',
  bloggersSearch: '/app/search-bloggers',
  blogger: '/app/search-bloggers/blogger/:id',
  bloggerPortfolio: '/app/search-bloggers/portfolio/:id',
  proposals: '/app/proposals',
  statistics: '/app/statistics',
  archive: '/app/archive',
  personalBill: '/app/personal-bill',
  personalBillReplenishment: '/app/personal-bill/replenishment',
  advertiserChat: '/app/advertiser-chat',
  managerChat: '/app/manager-chat',
  supportChat: '/app/support-chat',
  profile: '/app/profile',
  inst: '/app/profile/instagram',
  organisation: '/app/organisation',
  notifies: '/app/notifies',
};

export default routes;