export const statuses = [
  {
    value: "All",
    label: "companyStatus.all",
  },
  {
    value: "Created",
    label: "companyStatus.Created",
  },
  {
    value: "AcceptCreative",
    label: "companyStatus.AcceptCreative",
  },
  {
    value: "OnModeration",
    label: "companyStatus.OnModeration",
  },
  {
    value: "InWork",
    label: "companyStatus.InWork",
  },
  {
    value: "PaymentRequired",
    label: "companyStatus.PaymentRequired",
  },
  {
    value: "Paid",
    label: "companyStatus.Paid",
  },
  {
    value: "ApprovalListOfBloggers",
    label: "companyStatus.ApprovalListOfBloggers",
  },
  {
    value: "AcceptListOfBloggers",
    label: "companyStatus.AcceptListOfBloggers",
  },
  {
    value: "ApprovalCreative",
    label: "companyStatus.ApprovalCreative",
  },
  {
    value: "Started",
    label: "companyStatus.Started",
  },
  {
    value: "Ended",
    label: "companyStatus.Ended",
  },
  {
    value: "Cancelled",
    label: "companyStatus.Cancelled",
  },
]

export const translatedStatuses = statuses.reduce((acc, { value, label }) => {
  const proxy = {...acc};
  proxy[value] = label;
  return proxy;
}, {})