import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useIntl from "react-intl/lib/src/components/useIntl";
import { find, isEmpty } from "lodash";
import { format } from "../../helpers/DateHelper";
import classNames from "classnames";
import Flex from "../../components/global/Flex";
import {getCompany, getLinkedBloggers} from "../../../store/actions/companies";
import Back from "../../components/icons/Back";
import routes from "../../routes";
import useStyles from "./styles";
import Loader from "../../components/global/Loader";
import { platforms } from "../../constants/platforms";
import Tooltip from "../../components/global/Tooltip";
import Copy from "../../components/icons/Copy";
import Edit from "../../components/icons/Edit";
import ToArchive from "../../components/icons/ToArchive";
import TextField from "@material-ui/core/TextField";
import {paymentModels} from "../../constants/paymentModels";
import Switcher from "../../components/global/Switch";
import Button from "@material-ui/core/Button";
import Trash from "../../components/icons/Trash";
import {useMediaQuery} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import {statuses} from "../../constants/companiesStatuses";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Add from "../../components/icons/Add";
import Http from "../../../http";
import ArrowLeft from "../../components/icons/ArrowLeft";
import ArrowRight from "../../components/icons/ArrowRight";

const bloggerStatuses = [
  {
    name: "blogger.statuses.chosen",
    value: 2,
  },
  {
    name: "blogger.statuses.invited",
    value: 0,
  },{
    name: "blogger.statuses.responded",
    value: 1,
  },
  {
    name: "blogger.statuses.fit",
    value: undefined,
  },
];

const Company = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { push } = useHistory();
  const { formatMessage } = useIntl();
  const isAuth = useSelector(state => state.auth.isAuth);
  const company = useSelector(state => state.companies.company);
  const loading = useSelector(state => state.companies.loading);
  const linkedBloggers = useSelector(state => state.companies.linkedBloggers);
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const creativesLinks = company.bloggers?.filter((item) => item.status === "BloggerApproved" && item.creatives);
  console.log(creativesLinks);
  const addHandler = (bloggerId) => {
    if(currentTab === 1){
      Http.post(`/ident/v1/advuser/camp/${id}/submit-request/${bloggerId}`)
    } else if(currentTab === undefined) {
      Http.post(`/ident/v1/advuser/camp/${id}/invite-blogger/${bloggerId}`)
    }
  }
  const removeHandler = (bloggerId) => {
    if(currentTab === 0){
      Http.post(`/ident/v1/advuser/camp/${id}/cancel-invitation/${bloggerId}`)
        .then(() => dispatch(getLinkedBloggers(currentPage, id, currentTab)));
    } else if(currentTab === 1){
      Http.post(`/ident/v1/advuser/camp/${id}/reject-blogger-request/${bloggerId}`)
        .then(() => dispatch(getLinkedBloggers(currentPage, id, currentTab)));
    } else {
      Http.post(`/ident/v1/advuser/camp/${id}/reject-blogger-request/${bloggerId}`)
        .then(() => dispatch(getLinkedBloggers(currentPage, id, currentTab)));
    }
  };

  useEffect(() => {
    if(isAuth){
      dispatch(getCompany(id))
    }
  }, [isAuth]);
  useEffect(() => {
    if(isAuth){
      dispatch(getLinkedBloggers(currentPage, id, currentTab))
    }
  }, [currentPage])
  useEffect(() => {
    if(isAuth){
      dispatch(getLinkedBloggers(1, id, currentTab))
      setCurrentPage(1);
    }
  }, [isAuth, currentTab])
  if(loading || isEmpty(company)){
    return <Loader />
  }
  const Platform = find(platforms, ["id", company.socialNetwork?.id])?.icon;
  const creatives = company.creative?.pathsToMaterials;
  return (
    <div>
      <Typography className={classes.title} onClick={() => push(routes.companies)} variant="h3">
        <Back />{company.name}
      </Typography>
      <div className={classes.topCard}>
        <Flex middle="xs" column={!md} between="xs" container spacing={10}>
          <Flex>
            <div className={classes.logo}>
              <img src={company.logo?.uri || "https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg"} alt="logo"/>
            </div>
          </Flex>
          <Flex middle="xs" className={classes.topCardItem} xs="100%" lg="auto" flex between>
            {!md && formatMessage({ id: "companyPage.platform" })}
            {Platform && <Platform />}
          </Flex>
          <Flex middle="xs" className={classes.topCardItem} xs="100%" lg="auto" flex between>
            {!md && formatMessage({ id: "companyPage.budget" })}
            <div className={classes.budget}>
              {company.plannedBudget} ₽
            </div>
          </Flex>
          <Flex middle="xs" className={classes.topCardItem} xs="100%" lg="auto" flex between>
            {!md && formatMessage({ id: "companyPage.stage" })}
            <div className={classes.agreeingBloggersList}>
              {find(statuses, ["value", company.campaignStatus])?.label && formatMessage({ id: find(statuses, ["value", company.campaignStatus])?.label })}
            </div>
          </Flex>
          <Flex xs="100%" lg="auto">
            <Flex center="xs" nowrap container spacing={15} middle="xs" >
              <Flex>
                <Tooltip title={formatMessage({ id: "tooltip.copyLink" })}>
                  <span>
                    <CopyToClipboard
                      text={`https://staging.blogyou.ru/app/companies/company/${company.id}`}
                    >
                      <Copy />
                    </CopyToClipboard>
                  </span>
                </Tooltip>
              </Flex>
              <Flex>
                <Tooltip title={formatMessage({ id: "tooltip.edit" })}>
                  <span onClick={() => push(`/app/companies/edit/${company.id}`)}>
                    <Edit />
                  </span>
                </Tooltip>
              </Flex>
              <Flex>
                <Tooltip title={formatMessage({ id: "tooltip.toArchive" })}>
                  <span>
                    <ToArchive />
                  </span>
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex container spacing={20} marginBottom>
        <Flex lg="50%" xs="100%">
          <Flex container spacing={20} marginBottom>
            <Flex xs="100%">
              <div className={classes.card}>
                <Flex container spacing={20} marginBottom>
                  <Flex xs="100%">
                    <div className={classes.cardTitle}>
                      {formatMessage({ id: "companyPage.mainInfo" })}
                    </div>
                  </Flex>
                  <Flex xs="100%" flex>
                    <img style={{ width: "100%" }} src={company.logo?.uri || "https://i.mr-7.ru/photos/2013/03/resize_JXg4y9J9Mr3E1TaP8Jbo.jpg"} alt="logo"/>
                  </Flex>
                  <Flex xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={company.name}
                      label={formatMessage({ id: "stepForm.companyName" })}
                    />
                  </Flex>
                  <Flex md="50%" xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={company.period?.from && format(new Date(company.period?.from), 'dd.MM.yyyy')}
                      label={formatMessage({ id: "stepForm.from" })}
                    />
                  </Flex>
                  <Flex md="50%" xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      iinputProps={{
                        readOnly: true,
                      }}
                      value={company.period?.from && format(new Date(company.period?.to), 'dd.MM.yyyy')}
                      label={formatMessage({ id: "stepForm.to" })}
                    />
                  </Flex>
                  <Flex md="50%" xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={find(paymentModels, ["value", company.campaignPayment?.paymentModel])?.label && formatMessage({ id: find(paymentModels, ["value", company.campaignPayment?.paymentModel])?.label })}
                      label={formatMessage({ id: "stepForm.paymentModel" })}
                    />
                  </Flex>
                </Flex>
              </div>
            </Flex>
            <Flex xs="100%">
              <div className={classes.card}>
                <Flex container spacing={20} marginBottom>
                  <Flex xs="100%">
                    <div className={classes.cardTitle}>
                      {formatMessage({ id: "companyPage.bloggerTechnicalTask" })}
                    </div>
                  </Flex>
                  <Flex xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      multiline
                      rows={4}
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={company.description}
                      label={formatMessage({ id: "stepForm.description" })}
                    />
                  </Flex>
                  <Flex xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={company.goal}
                      label={formatMessage({ id: "stepForm.companyGoal" })}
                    />
                  </Flex>
                  <Flex xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={company.targetPlatform}
                      label={formatMessage({ id: "stepForm.landingPage" })}
                    />
                  </Flex>
                  <Flex xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      label={formatMessage({ id: "stepForm.materials" })}
                    />
                  </Flex>
                  <Flex xs="100%">
                    <TextField
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      multiline
                      rows={4}
                      disabled
                      inputProps={{
                        readOnly: true,
                      }}
                      value={company.detailedDescription}
                      label={formatMessage({ id: "stepForm.DetailDescription" })}
                    />
                  </Flex>
                  <Flex xs="100%">
                    <div className={classes.fakeInput}>
                      <div className={classes.fakeLabel}>{formatMessage({ id: "stepForm.creative" })}</div>
                      <Flex container spacing={20} marginBottom>
                        {creatives && creatives.map(({ uri }) => <Flex xs="100%" md="33.33333%">
                          <img src={uri} style={{ width: "100%" }} alt=""/>
                        </Flex>)}
                      </Flex>
                    </div>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <Flex lg="50%" xs="100%">
          <Flex xs="100%">
            <Flex container column spacing={20} marginBottom>
              <Flex xs="100%">
                <div className={classes.filterWrap}>
                  <div className={classes.filter}>
                    {bloggerStatuses.map(({ name, value }) => {
                      const rootClasses = classNames({
                        [classes.filterItem]: true,
                        "active": value === currentTab,
                      })
                      return (
                        <div className={rootClasses} onClick={() => setCurrentTab(value)}>
                          <div className="name">{formatMessage({ id: name })}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Flex>
              <Flex xs="100%">
                <div className={classes.card}>
                  <div className={classes.cardTitle} style={{ marginBottom: 20 }}>
                    {formatMessage({ id: "companyPage.bloggers" })}
                    <div className={classes.bloggersCount}>
                      {linkedBloggers.count}
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      {currentPage > 1 && (
                        <ArrowLeft
                          onClick={() => setCurrentPage(currentPage - 1)}
                          style={{
                            cursor: "pointer",
                            marginRight: 10
                          }} />
                      )}
                      {currentPage < linkedBloggers.pages && (
                        <ArrowRight onClick={() => setCurrentPage(currentPage + 1)} style={{ cursor: "pointer" }} />
                      )}
                    </div>
                  </div>
                  <Flex container spacing={20} marginBottom>
                    {linkedBloggers.items.map((item) => {
                      return (
                        <Flex xs="100%">
                          <div className={classes.memberItem}>
                            <Flex container middle="xs" between spacing={10}>
                              <Flex>
                                <div className={classes.avatar}>
                                  <img src={item.photo?.uri || "https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg"} alt="ava"/>
                                </div>
                              </Flex>
                              <Flex>
                                <div className={classes.memberName}>{item?.userName}</div>
                                <div className={classes.memberTags}>
                                  {item.interests.map((item) => item?.value?.description).join(", ")}
                                </div>
                              </Flex>
                              <Flex>
                                <div className={classes.memberRating}>
                                  {`${item.accountRating}/10`}
                                </div>
                              </Flex>
                              <Flex>
                                <Flex container spacing={2} marginBottom column="xs">
                                  {(currentTab !== undefined) && <Flex style={{ cursor: "pointer" }}>
                                    <Trash onClick={() => removeHandler(item.id)} />
                                  </Flex>}
                                  {(currentTab === 1 || currentTab === undefined) && <Flex style={{ cursor: "pointer" }}>
                                    <Add onClick={() => addHandler(item.id)} />
                                  </Flex>}
                                </Flex>
                              </Flex>
                            </Flex>
                          </div>
                        </Flex>
                      )
                    })}
                  </Flex>
                </div>
              </Flex>
              <Flex xs="100%">
                <Button fullWidth variant="contained" color="secondary">
                  {formatMessage({ id: "companyPage.rateMembers" })}
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex xs="100%">
            <Flex container spacing={20} marginBottom>
              <Flex xs="100%">
                <div className={classes.card}>
                  <Flex container spacing={20} marginBottom>
                    <Flex xs="100%">
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "companyPage.bloggersRequirement" })}
                      </div>
                    </Flex>
                    <Flex md="50%" xs="100%">
                      <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        multiline
                        inputProps={{
                          readOnly: true,
                        }}
                        value={company.countOfSubscribers}
                        label={formatMessage({ id: "stepForm.subscribers" })}
                      />
                    </Flex>
                    <Flex md="50%" xs="100%">
                      <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        multiline
                        inputProps={{
                          readOnly: true,
                        }}
                        value={company.engagementRate}
                        label={formatMessage({ id: "stepForm.engagementIndex" })}
                      />
                    </Flex>
                    <Flex md="50%" xs="100%">
                      <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        multiline
                        inputProps={{
                          readOnly: true,
                        }}
                        value={company.rating}
                        label={formatMessage({ id: "stepForm.rating" })}
                      />
                    </Flex>
                    <Flex md="50%" xs="100%">
                      <div className={classes.fakeInput}>
                        <div className={classes.fakeLabel}>
                          {formatMessage({ id: "stepForm.platform" })}
                        </div>
                        {Platform && <div className={classes.iconWrap}><Platform /></div>}
                      </div>
                    </Flex>
                    <Flex xs="100%">
                      <TextField
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        multiline
                        inputProps={{
                          readOnly: true,
                        }}
                        value={company.averagePostComments}
                        label={formatMessage({ id: "stepForm.comments" })}
                      />
                    </Flex>
                    <Flex flex middle="xs" style={{ pointerEvents: "none" }} xs="100%">
                      <Switcher value={1} />
                      {formatMessage({ id: "stepForm.onlySingIn" })}
                    </Flex>
                  </Flex>
                </div>
              </Flex>
              <Flex xs="100%">
                <div className={classes.card}>
                  <Flex container spacing={10} marginBottom>
                    <Flex xs="100%">
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "companyPage.theme" })}
                      </div>
                    </Flex>
                    {company.productCategories && company.productCategories.map((category) => <Flex>
                      <div className={classes.category}>
                        {category?.value?.description}
                      </div>
                    </Flex>)}
                  </Flex>
                </div>
              </Flex>
              <Flex xs="100%">
                <div className={classes.card}>
                  <Flex container spacing={10} marginBottom>
                    <Flex xs="100%">
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "companyPage.creativeLinks" })}
                      </div>
                    </Flex>
                    {creativesLinks && creativesLinks.map((blogger) => {
                      const label = blogger.bloggerAccount.value?.userName;
                      return (
                        <>
                          {blogger.creatives.map((creative) => <Flex xs="100%">
                            <TextField
                              variant="outlined"
                              color="secondary"
                              fullWidth
                              disabled
                              inputProps={{
                                readOnly: true,
                              }}
                              value={creative.value.creativeLink}
                              label={label}
                            />
                          </Flex>)}
                        </>
                      )
                    })}
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
};

export default Company;