import Companies from "../components/icons/Companies";
import CompaniesSearch from "../components/icons/CompaniesSearch";
import Proposals from "../components/icons/Proposals";
import Statistics from "../components/icons/Statistics";
import Archive from "../components/icons/Archive";
import MyBill from "../components/icons/MyBill";
import ChatWithAdvertiser from "../components/icons/ChatWithAdvertiser";
import ChatWithManager from "../components/icons/ChatWithManager";
import ChatWithSupport from "../components/icons/ChatWithSupport";
import ProfileData from "../components/icons/ProfileData";
import CompanyData from "../components/icons/CompanyData";
import Notifies from "../components/icons/Notyfies";
import routes from "../../common/routes";

export const sidebars = {
  Blogger: [
    {
      category: "sidebar.companies",
      links: [
        {
          route: routes.companies,
          name: "sidebar.companies.all",
          icon: Companies,
        },
        {
          route: routes.companySearch,
          name: "sidebar.companies.search",
          icon: CompaniesSearch,
        },
        {
          route: routes.statistics,
          name: "sidebar.companies.statistics",
          icon: Statistics,
        },
        {
          route: routes.archive,
          name: "sidebar.companies.archive",
          icon: Archive,
        },
      ],
    },
    {
      category: "sidebar.personalBill",
      links: [
        {
          route: routes.personalBill,
          name: "sidebar.personalBill.myBill",
          icon: MyBill,
        }
      ],
    },
    // {
    //   category: "sidebar.chats",
    //   links: [
    //     {
    //       route: routes.advertiserChat,
    //       name: "sidebar.chats.advertisers",
    //       icon: ChatWithAdvertiser,
    //     },
    //     {
    //       route: routes.managerChat,
    //       name: "sidebar.chats.managers",
    //       icon: ChatWithManager,
    //     },
    //     {
    //       route: routes.supportChat,
    //       name: "sidebar.chats.supports",
    //       icon: ChatWithSupport,
    //     },
    //   ],
    // },
    {
      category: "sidebar.settings",
      links: [
        {
          route: routes.profile,
          name: "sidebar.settings.profile",
          icon: ProfileData,
        },
        {
          route: routes.organisation,
          name: "sidebar.settings.organisation",
          icon: CompanyData,
        },
        {
          route: routes.notifies,
          name: "sidebar.settings.notifies",
          icon: Notifies,
        },
      ],
    },
  ],
  Advertiser: [
    {
      category: "sidebar.companies",
      links: [
        {
          route: routes.companies,
          name: "sidebar.companies.my",
          icon: Companies,
        },
        {
          route: routes.bloggersSearch,
          name: "sidebar.companies.searchBlogger",
          icon: CompaniesSearch,
        },
        {
          route: routes.statistics,
          name: "sidebar.companies.statistics",
          icon: Statistics,
        },
        {
          route: routes.archive,
          name: "sidebar.companies.archive",
          icon: Archive,
        },
      ],
    },
    {
      category: "sidebar.personalBill",
      links: [
        {
          route: routes.personalBill,
          name: "sidebar.personalBill.myBill",
          icon: MyBill,
        }
      ],
    },
    // {
    //   category: "sidebar.chats",
    //   links: [
    //     {
    //       route: routes.advertiserChat,
    //       name: "sidebar.chats.bloggers",
    //       icon: ChatWithAdvertiser,
    //     },
    //     {
    //       route: routes.managerChat,
    //       name: "sidebar.chats.managers",
    //       icon: ChatWithManager,
    //     },
    //     {
    //       route: routes.supportChat,
    //       name: "sidebar.chats.supports",
    //       icon: ChatWithSupport,
    //     },
    //   ],
    // },
    {
      category: "sidebar.settings",
      links: [
        {
          route: routes.profile,
          name: "sidebar.settings.profile",
          icon: ProfileData,
        },
        {
          route: routes.organisation,
          name: "sidebar.settings.organisation",
          icon: CompanyData,
        },
        {
          route: routes.notifies,
          name: "sidebar.settings.notifies",
          icon: Notifies,
        },
      ],
    },
  ],
}