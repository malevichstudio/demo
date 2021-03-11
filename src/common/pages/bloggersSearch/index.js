import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import Search from "../../components/icons/Seacrh";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchForm from "./SearchForm";
import Button from "@material-ui/core/Button";
import Checked from "../../components/icons/Checked";
import Tip from "../../components/icons/Tip";
import Star from "../../components/icons/Star";
import NumberFormat from "react-number-format";
import { getBloggers } from "../../../store/actions/bloggers";
import { find } from "lodash";
import { platforms } from "../../constants/platforms";
import Loader from "../../components/global/Loader";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import Tooltip from "../../components/global/Tooltip";
import MobileFilters from "./mobileFilters";
import Filter from "../../components/icons/Filter";
import { show } from "redux-modal";
import {BLOGGERS_FILTERS, SEND_INVITE} from "../../constants/modalsNames";
import InviteModal from "../../components/modals/InviteModal";
import {getMyCompanies} from "../../../store/actions/companies";
import {selectMyCompanies} from "../companies/functions";
import {bloggerCompaniesSelectOptions} from "../../constants/bloggerCompaniesStatuses";

const BloggersSearch = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const bloggers = useSelector(state => state.bloggers.bloggers);
  const loading = useSelector(state => state.bloggers.loading);
  const myCompanies = useSelector(state => state.companies.myCompanies);
  const { push } = useHistory();
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    if(isAuth){
      dispatch(getMyCompanies());
    }
  }, [isAuth])
  useEffect(() => {
    if(isAuth){
      dispatch(getBloggers(1, filters, true))
      setPage(2);
    }
  }, [isAuth, filters]);
  useDebouncedEffect(() => {
    setFilters(prev => ({
      ...prev,
      userName: search || undefined,
    }))
  }, 1000, [search]);
  const moreBloggersHandler = () => {
    dispatch(getBloggers(page, filters))
    setPage(page + 1);
  };
  const onFiltersSubmit = ({
   subscribersCountFrom,
   subscribersCountTo,
   interests,
   socialNetwork,
   engagementRate,
   creativePriceFrom,
   creativePriceTo,
  }) => {
    setFilters({
      interests: interests?.length ? interests.map(({ id }) => ({ id })) : undefined,
      socialNetwork: socialNetwork && {
        id: socialNetwork,
      },
      subscribersCountFrom,
      subscribersCountTo,
      creativePriceFrom,
      creativePriceTo,
      engagementRate,
      userName: search || undefined,
    })
  };
  return <div>
    <InviteModal />
    <Flex between container column={!md} marginBottom={!md} spacing={20}>
      <Flex flex between middle="xs" xs="100%" lg="300px">
        <Typography variant="h3">
          {formatMessage({ id: "pages.bloggersSearch" })}
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
    {bloggers.items.length
      ? bloggers.items.map((blogger) => {
        const Platform = find(platforms, ["id", blogger.socialNetwork?.id])?.icon;
        return (
          <div className={classes.card}>
            <Flex container spacing={md ? 20 : 10} nowrap>
              <Flex>
                <div className={classes.avatar}>
                  <img src={blogger.photo?.uri || "https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg"} alt="ava"/>
                </div>
              </Flex>
              <Flex grow="xs">
                <Flex container spacing={20} marginBottom>
                  <Flex xs="100%">
                    <Flex container spacing={20} between="xs">
                      {!md && (
                        <Flex container spacing={10} nowrap xs="100%">
                          <Flex>
                            <div className={classes.rating}>
                              Рейтинг:
                              <div className={classes.ratingNumbers}>
                                7/10
                              </div>
                            </div>
                          </Flex>
                          <Flex style={{ marginTop: 3 }}>
                            <Star />
                          </Flex>
                        </Flex>
                      )}
                      <Flex>
                        <Flex  style={{ margin: "10px 0 15px" }} container spacing={5} middle="xs">
                          <Flex>
                            <div className={classes.nickname}>
                              <NavLink to={`/app/search-bloggers/blogger/${blogger?.id}`}>
                                {blogger?.userName}
                              </NavLink>
                            </div>
                          </Flex>
                          <Flex flex>
                            <Checked />
                          </Flex>
                          <Flex flex>
                            <Tooltip offset={5} title={formatMessage({ id: "bloggerCard.registered" })}>
                              <div style={{ display: "flex" }}>
                                <Tip />
                              </div>
                            </Tooltip>
                          </Flex>
                        </Flex>
                        <Flex container spacing={10} middle="xs">
                          <Flex flex>
                            {Platform && <Platform />}
                          </Flex>
                        </Flex>
                      </Flex>
                      {md && (
                        <>
                          <Flex style={{ marginLeft: "auto" }}>
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
                                  onClick={() => dispatch(show(SEND_INVITE, { bloggerId: blogger.id, myCompanies }))}
                                >
                                  {formatMessage({ id: "bloggerCard.sendInvite" })}
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                          <Flex style={{ marginTop: 10 }}>
                            <Star />
                          </Flex>
                        </>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
                {md && (
                  <Flex container spacing={20} nowrap>
                    <Flex grow="xs">
                      <div className={classes.message}>
                        {blogger?.description}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.rating}>
                        Рейтинг:
                        <div className={classes.ratingNumbers}>
                          7/10
                        </div>
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
                  {blogger?.description}
                </div>
              </>
            )}
            <div className={classes.seporator} />
            <Flex nowrap container column={!md} spacing={0}>
              <Flex grow="xs" flex style={{ flexWrap: md ? "nowrap" : "wrap"}}>
                <Flex container spacing={10}>
                  <Flex xs="100%">
                    <div className={classes.proxyTitle}>
                      Подписчики
                    </div>
                  </Flex>
                  <Flex xs="100%">
                    <span className={classes.value}>  <NumberFormat displayType={'text'} value={blogger.subscribersCount} thousandSeparator=" " /></span>
                    <span className={classes.proxyValue}>чел</span>
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
                      Индекс вовлечённости
                    </div>
                  </Flex>
                  <Flex xs="100%">
                    <span className={classes.value}>{blogger.engagementRatePercent}</span>
                    <span className={classes.proxyValue}>%</span>
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
                      Среднее кол-во комментариев
                    </div>
                  </Flex>
                  <Flex xs="100%">
                    <span className={classes.value}><NumberFormat displayType={'text'} value={blogger.commentsAverage} thousandSeparator=" " /></span>
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
                      История взаимоотношений
                    </div>
                  </Flex>
                  <Flex xs="100%">
                    <span>#папа #мама</span>
                  </Flex>
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
                    <Button
                      fullWidth={!md}
                      variant="contained"
                      color="secondary"
                      onClick={() => dispatch(show(SEND_INVITE, { bloggerId: blogger?.blogger?.id, myCompanies }))}
                    >
                      {formatMessage({ id: "bloggerCard.sendInvite" })}
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </div>
        )
      })
      : (
        !loading && <div>Результатов нет</div>
      )
    }
    {bloggers.pages > page && (
      <Flex flex center="xs">
        <Button
          color="primary"
          variant="contained"
          onClick={moreBloggersHandler}
        >
          {formatMessage({ id: "action.loadMore" })}
        </Button>
      </Flex>
    )}
  </div>
}

export default BloggersSearch;