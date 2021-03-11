import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import TextField from "@material-ui/core/TextField";
import { format } from "../../helpers/DateHelper";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";
import {NavLink, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyCompanies } from "../../../store/actions/companies";
import { filterCompanies, selectMyCompanies } from "./functions";
import { statuses, translatedStatuses } from "../../constants/companiesStatuses"
import { find } from "lodash";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import BaseSelect from "../../components/global/BaseSelect";
import Copy from "../../components/icons/Copy";
import Edit from "../../components/icons/Edit";
import ToArchive from "../../components/icons/ToArchive";
import Tooltip from "../../components/global/Tooltip";
import LoaderWrap from "../../components/global/LoaderWrap";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import Search from "../../components/icons/Seacrh";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { platforms } from "../../constants/platforms";
import {CopyToClipboard} from "react-copy-to-clipboard";

const Advertiser = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const loadingCompanies = useSelector(state => state.companies.loading);
  const loadingMe = useSelector(state => state.me.loading);
  const [companiesFilter, setCompaniesFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  const storeCompanies = useSelector(selectMyCompanies)
  const [myCompanies, setMyCompanies] = useState([]);
  useEffect(() => {
    if(isAuth){
      dispatch(getMyCompanies(true));
    }
  }, [isAuth])
  useDebouncedEffect(() => {
    if(localLoading) setLocalLoading(false);
    setMyCompanies(filterCompanies(storeCompanies, companiesFilter, search))
  }, 1000, [search, storeCompanies, companiesFilter]);
  return <div>
    <Typography variant="h3">
      {formatMessage({ id: "pages.archive" })}
    </Typography>
    <Flex className={classes.filters} between container column={!md} marginBottom={!md} spacing={20}>
      <Flex xs="100%" lg="300px">
        <BaseSelect
          value={companiesFilter}
          isIntl
          border
          onChange={event => setCompaniesFilter(event.target.value)}
          options={statuses.filter(({ value }) => value === "Ended" || value === "Cancelled" || value === "All")}
        />
      </Flex>
      <Flex xs="100%" lg="300px" removeMargin>
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
    {md && (
      <div className={classes.topbar}>
        <div className={classes.mainColumn} style={{ justifyContent: "center" }}>Название кампании</div>
        <div className={classes.column}>Площадка</div>
        <div className={classes.column}>Бюджет</div>
        <div className={classes.column}>Длительность</div>
        <div className={classes.column}>Участники</div>
        <div className={classes.column}>Хештеги</div>
        <div className={classes.column} />
      </div>
    )}
    <div>
      <LoaderWrap loading={loadingCompanies || loadingMe || localLoading}>
        {
          myCompanies.length
            ? myCompanies.map(({ status, companies }) => {
              return (
                <React.Fragment key={status}>
                  <div className={classes.status}>
                    {formatMessage({ id: translatedStatuses[status] })}
                  </div>
                  {companies.map((company) => {
                    return (
                      <div className={classes.company}>
                        <div className={classes.mainColumn}>
                          <Flex nowrap container spacing={15} middle="xs">
                            <Flex>
                              <NavLink to={`companies/company/${company.id}`}>
                                <div className={classes.companyLogo}>
                                  <img src={company?.logo?.uri || "https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg"} alt="logo"/>
                                </div>
                              </NavLink>
                            </Flex>
                            <Flex className={classes.companyName}>
                              <NavLink to={`companies/company/${company.id}`}>
                                {company.name}
                              </NavLink>
                            </Flex>
                          </Flex>
                        </div>
                        <div className={classes.column}>
                          <div className={classes.mobileTitle}>Площадка</div>
                          <Flex center="xs" nowrap container spacing={15} middle="xs">
                            {company.socialNetwork?.id && [company.socialNetwork].map(({ id }) => {
                              const Icon = find(platforms, ["id", id])?.icon;

                              return <Flex flex>
                                <Icon />
                              </Flex>
                            })}
                          </Flex>
                        </div>
                        <div className={classes.column}>
                          <div className={classes.mobileTitle}>Бюджет</div>
                          <Flex center="xs" flex grow="xs" noWordWrap middle="xs" className={classes.budget}>
                            <NumberFormat displayType={'text'} value={company.plannedBudget} thousandSeparator=" " />&ensp;₽
                          </Flex>
                        </div>
                        <div className={classes.column}>
                          <div className={classes.mobileTitle}>Длительность</div>
                          <Flex center="xs" container spacing={15} middle="xs" column="xs">
                            <Flex className={classes.date}>
                              {company?.period?.from && format(new Date(company.period.from))}
                            </Flex>
                            <Flex className={classes.date}>
                              {company?.period?.to && format(new Date(company.period.to))}
                            </Flex>
                          </Flex>
                        </div>
                        <div className={classes.column}>
                          <div className={classes.mobileTitle}>Участинки</div>
                          <Flex center="xs" nowrap container spacing={lg ? 15 : 5} middle="xs">
                            <Flex>
                              <Tooltip offset={5} title={formatMessage({ id: "tooltip.leaveResponse" })}>
                                <div className={classes.response}>
                                  12
                                </div>
                              </Tooltip>
                            </Flex>
                            <Flex>
                              <Tooltip offset={5} title={formatMessage({ id: "tooltip.addToFavorite" })}>
                                <div className={classes.favorite}>
                                  6
                                </div>
                              </Tooltip>
                            </Flex>
                          </Flex>
                        </div>
                        <div className={classes.column}>
                          <div className={classes.mobileTitle}>Хештеги</div>
                          <Flex  center="xs" container spacing={15} middle="xs" column="xs">
                            <Flex className={classes.hashtag}>#test</Flex>
                            <Flex className={classes.hashtag}>#test</Flex>
                          </Flex>
                        </div>
                        <div className={classes.column}>
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
                          </Flex>
                        </div>
                      </div>
                    )
                  })}
                </React.Fragment>
              )
            })
            : <div>Результатов Нет</div>
        }
      </LoaderWrap>
    </div>
  </div>
}

export default Advertiser;