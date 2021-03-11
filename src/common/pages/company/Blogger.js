import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useIntl from "react-intl/lib/src/components/useIntl";
import { find, isEmpty } from "lodash";
import { format } from "../../helpers/DateHelper";
import Flex from "../../components/global/Flex";
import { getCompany } from "../../../store/actions/companies";
import Back from "../../components/icons/Back";
import routes from "../../routes";
import useStyles from "./styles";
import Loader from "../../components/global/Loader";
import { platforms } from "../../constants/platforms";
import TextField from "@material-ui/core/TextField";
import {paymentModels} from "../../constants/paymentModels";
import Switcher from "../../components/global/Switch";
import Button from "@material-ui/core/Button";
import {useMediaQuery} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import Http from "../../../http";
import Star from "../../components/icons/Star";
import Checked from "../../components/icons/Checked";

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
  const [link, setLink] = useState('');
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const creativesLinks = company?.bloggers[0]?.creatives;

  useEffect(() => {
    if(isAuth){
      dispatch(getCompany(id))
    }
  }, [isAuth]);
  if(loading || isEmpty(company)){
    return <Loader />
  }
  const Platform = find(platforms, ["id", company.socialNetwork?.id])?.icon;
  const creatives = company.creative?.pathToMaterials;
  const addLinkHandler = () => {
    const data = [
      {
        creativeLink: link,
      }
    ];
    if(creativesLinks){
      data.unshift(...creativesLinks.map((item) => ({ id: item.id })))
    }
    Http.put(`/ident/v1/blogger/camp/${id}/creatives`, data)
      .then(() => dispatch(getCompany(id)))
  }
  return (
    <div>
      <Typography className={classes.title} onClick={() => push(routes.companies)} variant="h3">
        <Back />{company.name}
      </Typography>
        <div className={classes.topCard}>
          <Flex container spacing={md ? 20 : 10} nowrap>
            <Flex>
              <div className={classes.avatar}>
                <img src={company.logo?.uri || "https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg"} alt="ava"/>
              </div>
            </Flex>
            <Flex grow="xs">
              <Flex container spacing={20} marginBottom middle="xs">
                <Flex xs="100%">
                  <Flex container spacing={20} between="xs" middle="xs">
                    <Flex xs="100%">
                      <Flex container spacing={20} between="xs" middle="xs">
                        <Flex>
                          <div className={classes.nickname}>{company?.name}</div>
                        </Flex>
                        <Flex style={{ justifyContent: "flex-end" }} container spacing={20} middle="xs">
                          <Flex>
                            <Star />
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex  style={{ margin: "10px 0 0" }} container spacing={5} middle="xs">
                        <Flex>
                          <div className={classes.nickname}>{company?.userName}</div>
                        </Flex>
                        <Flex flex>
                          <Checked />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              {md && (
                <Flex container spacing={20} nowrap  middle="xs">
                  <Flex grow="xs">
                    <div className={classes.message}>
                      {company?.description}
                    </div>
                  </Flex>
                  <Flex noshrink>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => Http.post(`/ident/v1/blogger/camp/${company.id}/send-request`, {})}
                    >
                      {formatMessage({ id: "companyCard.respond" })}
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
          {!md && (
            <>
              <div className={classes.seporator} />
              <div className={classes.message}>
                {company?.description}
              </div>
            </>
          )}
          <div className={classes.seporator} />
          <Flex nowrap container column={!md} spacing={0}>
            <Flex grow="xs" flex style={{ flexWrap: md ? "nowrap" : "wrap"}}>
              <Flex container spacing={10}>
                <Flex xs="100%">
                  <div className={classes.proxyTitle}>
                    {formatMessage({ id: "companyCard.platform" })}
                  </div>
                </Flex>
                <Flex xs="100%" flex>
                  {Platform && <Platform />}
                </Flex>
              </Flex>
              <Flex xs="100%" lg="auto">
                <div className={classes[md? "seporator180" : "seporator"]}/>
              </Flex>
            </Flex>
            <Flex grow="xs" flex style={{ flexWrap: md ? "nowrap" : "wrap"}}>
              <Flex container spacing={10}>
                <Flex xs="100%">
                  <div className={classes.proxyTitle}>
                    {formatMessage({ id: "companyCard.startEnd" })}
                  </div>
                </Flex>
                <Flex xs="100%">
                    <span className={classes.value}>
                      {(company?.period?.from && company?.period?.to && `${format(new Date(company?.period?.from))}-${format(new Date(company?.period?.to))}`)}
                    </span>
                </Flex>
              </Flex>
              <Flex xs="100%" lg="auto">
                <div className={classes[md? "seporator180" : "seporator"]}/>
              </Flex>
            </Flex>
            <Flex  flex grow="xs">
              <Flex container spacing={10}>
                <Flex xs="100%">
                  <div className={classes.proxyTitle}>
                    {formatMessage({ id: "companyCard.theme" })}
                  </div>
                </Flex>
                <Flex xs="100%">
                  <span>#папа #мама</span>
                </Flex>
              </Flex>
              <Flex xs="100%" lg="auto">
                <div className={classes[md? "seporator180" : "seporator"]}/>
              </Flex>
            </Flex>
            <Flex grow="xs" flex style={{ flexWrap: md ? "nowrap" : "wrap"}}  >
              <Flex>
                <div className={classes.rating}>
                  Рейтинг:
                  <div className={classes.ratingNumbers}>
                    7/10
                  </div>
                </div>
              </Flex>
            </Flex>
          </Flex>
          {!md && (
            <Flex style={{ marginTop: 20 }}>
              <Flex container spacing={20} marginBottom>
                <Flex xs="100%" lg="auto">
                  <Button fullWidth={!md} variant="outlined" color="secondary">
                    {formatMessage({ id: "bloggerCard.more" })}
                  </Button>
                </Flex>
                <Flex xs="100%" lg="auto">
                  <Button fullWidth={!md} variant="contained" color="secondary">
                    {formatMessage({ id: "bloggerCard.sendInvite" })}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )}
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
                <div className={classes.card}>
                  <div className={classes.cardTitle} style={{ marginBottom: 20 }}>
                    {formatMessage({ id: "companyPage.advertiser" })}
                    <div className={classes.bloggersCount}>
                      {linkedBloggers.count}
                    </div>
                  </div>
                </div>
              </Flex>
              <Flex xs="100%">
                <Button fullWidth variant="contained" color="secondary">
                  {formatMessage({ id: "companyPage.rateAdvertiser" })}
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
              {company.bloggerStatus === "BloggerApproved" && (
                <Flex xs="100%">
                  <div className={classes.card}>
                    <Flex container spacing={10} marginBottom>
                      <Flex xs="100%">
                        <div className={classes.cardTitle}>
                          {formatMessage({ id: "companyPage.addCreative" })}
                        </div>
                      </Flex>
                      <Flex xs="100%">
                        <TextField
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          onChange={(e) => setLink(e.target.value)}
                          value={link}
                          label={formatMessage({ id: "companyPage.link" })}
                        />
                      </Flex>
                      <Flex xs="100%">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={addLinkHandler}
                        >
                          {formatMessage({ id: "action.add"})}
                        </Button>
                      </Flex>
                      {creativesLinks && creativesLinks.map((item) => <Flex xs="100%">
                        <TextField
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          disabled
                          inputProps={{
                            readOnly: true,
                          }}
                          value={item.value.creativeLink}
                          label={formatMessage({ id: "companyPage.link" })}
                        />
                      </Flex>)}
                    </Flex>
                  </div>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
};

export default Company;