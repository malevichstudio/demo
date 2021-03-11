import { forIn } from "lodash";

export const selectMyCompanies = ({ companies: { myCompanies }}) => {
  const proxy = {};
  const statuses = myCompanies.map(({ campaignStatus }) => campaignStatus).filter(item => Boolean(item));
  statuses.forEach(item => {
    proxy[item] = [];
  })
  myCompanies.filter(({ campaignStatus }) => Boolean(campaignStatus)).forEach(item => {
    proxy[item.campaignStatus].push(item);
  })
  const companies = [];
  forIn(proxy, (value, key) => {
    companies.push({
      status: key,
      companies: value,
    })
  })

  return companies.filter(({ status }) => status !== "Ended" && status !== "Cancelled");
};

export const filterCompanies = (companies, filter, search) => {
  const proxySearch = search.toLowerCase();
  return companies
    .filter(({ status, companies })=> {
      if(!companies.map(({ name }) => name).filter(item => item.toLowerCase().includes(proxySearch)).length) return false;
      if(filter === "All") return true;
      return status === filter;
    })
    .map(({ status, companies }) => {
      const proxy = [
        ...companies.filter(({ name }) => name.toLowerCase().includes(proxySearch))
      ];
      return { status, companies: proxy };
    });
};


export const getBloggerCompanies = (companies, filter, search) => {
  const proxy = [];
  forIn(companies, (value, key) => {
    if(filter === 'All' && value.length){
      proxy.push({
        status: key,
        companies: value.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
      })
    } else if(filter === key  && value.length){
      proxy.push({
        status: key,
        companies: value.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
      })
    }
  })

  return proxy.filter((item) => item.companies.length);
};