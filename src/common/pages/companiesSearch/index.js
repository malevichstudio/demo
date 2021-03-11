import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import { show } from "redux-modal";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { format } from "../../helpers/DateHelper";
import Http from "../../../http";
import Flex from "../../components/global/Flex";
import Search from "../../components/icons/Seacrh";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchForm from "./SearchForm";
import Button from "@material-ui/core/Button";
import Checked from "../../components/icons/Checked";
import Tip from "../../components/icons/Tip";
import Star from "../../components/icons/Star";
import { find } from "lodash";
import { platforms } from "../../constants/platforms";
import Loader from "../../components/global/Loader";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import Tooltip from "../../components/global/Tooltip";
import MobileFilters from "./mobileFilters";
import Filter from "../../components/icons/Filter";
import { BLOGGERS_FILTERS } from "../../constants/modalsNames";
import { getCompanies } from "../../../store/actions/companies";
import {toast} from "react-toastify";

const CompaniesSearch = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const companies = useSelector(state => state.companies.companies);
  const loading = useSelector(state => state.companies.loading);
  const { push } = useHistory();
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const respondHandler = (id) => {
    Http.post(`/ident/v1/blogger/camp/${id}/send-request`, {})
      .then(() =>toast.success(formatMessage({ id: "toast.respondSend" })))
      .catch(() => toast.error(formatMessage({ id: "toast.respondError" })));
  }
  useEffect(() => {
    if(isAuth){
      dispatch(getCompanies(1, filters, true))
      setPage(2);
    }
  }, [isAuth, filters]);
  useDebouncedEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchString: search || undefined,
    }))
  }, 1000, [search]);
  const moreCompaniesHandler = () => {
    dispatch(getCompanies(page, filters))
    setPage(page + 1);
  };
  const onFiltersSubmit = ({
   subscribersCountFrom,
   subscribersCountTo,
   categories,
   socialNetwork,
   engagementRate,
   creativePriceFrom,
   creativePriceTo,
   paymentType,
   paymentModel,
  }) => {
    setFilters({
      categories: categories?.length ? categories.map(({ id }) => ({ id })) : undefined,
      socialNetwork: socialNetwork && {
        id: socialNetwork,
      },
      subscribersCountFrom,
      subscribersCountTo,
      creativePriceFrom,
      creativePriceTo,
      engagementRate,
      paymentModel,
      paymentType: paymentModel === "Mixed" ? paymentType : null,
    })
  };
  return <div>
    <Flex between container column={!md} marginBottom={!md} spacing={20}>
      <Flex flex between middle="xs" xs="100%" lg="auto">
        <Typography variant="h3">
          {formatMessage({ id: "pages.companiesSearch" })}
        </Typography>
        {!md && <Filter onClick={() => dispatch(show(BLOGGERS_FILTERS))} />}
      </Flex>
      <Flex xs="100%" lg="300px" >
        <TextField
          fullWidth
          variant="outlined"
          autoComplete="off"
          placeholder="Поиск"
          classes={{
            root: classes.searchRoot
          }}
          value={search}
          onChange={event => setSearch(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search style={{ width: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Flex>
    </Flex>
    {
      md
        ? <SearchForm onSubmit={onFiltersSubmit} />
        : <MobileFilters onSubmit={onFiltersSubmit}/>
    }

    {loading && <Loader />}
    {companies.items.length
      ? companies.items.map((company) => {
        const Platform = find(platforms, ["id", company.socialNetwork?.id])?.icon;
        return (
          <div className={classes.card}>
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
                          <Flex style={{ marginLeft: "auto" }} noshrink>
                            <Flex container spacing={20}>
                              <Flex>
                                <Button variant="outlined" color="secondary">
                                  {formatMessage({ id: "bloggerCard.more" })}
                                </Button>
                              </Flex>
                              <Flex>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => respondHandler(company.id)}
                                >
                                  {formatMessage({ id: "companyCard.respond" })}
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                          <Flex>
                            <Star />
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
        )
      })
      :(
        !loading && <div>{formatMessage({ id: "noResults"})}</div>
      )
    }
    {page < companies.pages && (
      <Flex flex center="xs">
        <Button
          color="primary"
          variant="contained"
          onClick={moreCompaniesHandler}
        >
          {formatMessage({ id: "action.loadMore" })}
        </Button>
      </Flex>
    )}
  </div>
}

export default CompaniesSearch;