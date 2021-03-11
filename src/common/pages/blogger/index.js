import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Checked from "../../components/icons/Checked";
import Tip from "../../components/icons/Tip";
import Star from "../../components/icons/Star";
import NumberFormat from "react-number-format";
import Loader from "../../components/global/Loader";
import Tooltip from "../../components/global/Tooltip";
import {getBlogger} from "../../../store/actions/bloggers";
import {find} from "lodash";
import {platforms} from "../../constants/platforms";
import Pie from "../../components/global/Diagrams/Pie";
import BaseSelect from "../../components/global/BaseSelect";
import TextField from "@material-ui/core/TextField";
import {statuses} from "../../constants/companiesStatuses";
import Instagram from "../../components/icons/Instagram";

const Blogger = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const blogger = useSelector(state => state.bloggers.blogger);
  const loading = useSelector(state => state.bloggers.loading);
  const sex = useSelector(state => state.bloggers.blogger?.audienceGroupPercentage);
  const age = useSelector(state => state.bloggers.blogger?.ageIntervals);
  const geo = useSelector(state => state.bloggers.blogger?.geo);
  const { push } = useHistory();
  const { id } = useParams();
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    if(isAuth){
      dispatch(getBlogger(id))
    }
  }, [isAuth]);
  const Platform = find(platforms, ["id", blogger.socialNetwork?.id])?.icon;

  const geoColors = ["#2789AE", "#20B5EE" ,"#EDEDED" ,"#20B5EE"];
  const sexColors = ["#2789AE", "#20B5EE" ,"#EDEDED" ,"#20B5EE"];
  const ageColors = ["#2789AE", "#20B5EE" ,"#EDEDED" ,"#20B5EE"];
  return <div>
    {loading && <Loader />}
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
              <Flex container spacoing={20} between="xs">
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
                      <div className={classes.nickname}>{blogger?.userName}</div>
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
                    <Flex>
                      <Flex container spacing={20}>
                        <Flex>
                          <Button variant="outlined" color="secondary">
                            {formatMessage({ id: "bloggerCard.more" })}
                          </Button>
                        </Flex>
                        <Flex>
                          <Button variant="contained" color="secondary">
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
              <Button fullWidth={!md} variant="contained" color="secondary">
                {formatMessage({ id: "bloggerCard.sendInvite" })}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
    <Flex container spacing={30} marginBottom>
      <Flex xs="100%" lg="50%">
        <div className={classes.dinamic}>
          <div className={classes.dinamicTitle}>
            {formatMessage({ id: "userProfile.instagram.commercialFormat" })}
          </div>
          <Flex container spacing={20} marginBottom>
            <Flex xs="100%" lg="50%">
              <BaseSelect
                isIntl
                fullWidth
                options={statuses.filter(({ value }) => value !== "Ended" && value !== "Cancelled")}
                label={formatMessage({ id: "userProfile.instagram.commercialFormat" })}
              />
            </Flex>
            <Flex xs="100%" lg="50%">
              <TextField
                label={formatMessage({ id: "searchForm.price.from" })}
                variant="outlined"
              />
            </Flex>
          </Flex>
        </div>
      </Flex>
      <Flex xs="100%" lg="50%">
        <div className={classes.dinamic}>
          <div className={classes.dinamicTitle}>
            {formatMessage({ id: "bloggersSearch.subscribersStatistics" })}
          </div>
          <Flex container spacing={20} marginBottom>
            <Flex>
              <div className={classes.newSubs}>
                +10000
              </div>
            </Flex>
            <Flex>
              <div className={classes.unSubs}>
                -10000
              </div>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Flex>
    <Flex container spacing={30} marginBottom>
      <Flex xs="100%" lg="33.3333%">
        <div className={classes.dinamic}>
          <div className={classes.pieTitle}>
            {formatMessage({ id: "userProfile.instagram.sex" })}
          </div>
          {sex && <Pie
            colors={sexColors}
            data={sex}
          />}
        </div>
      </Flex>
      <Flex xs="100%" lg="33.3333%">
        <div className={classes.dinamic}>
          <div className={classes.pieTitle}>
            {formatMessage({ id: "userProfile.instagram.geo" })}
          </div>
          {geo && <Pie
            colors={geoColors}
            data={[
              ...geo.slice(0, 2),
              { name: "Others", percentage: 100 - geo.slice(0, 3).map(({ percentage }) => percentage).reduce((acc, item) => acc + item)},
              ...geo.slice(2, 3),
            ]}
          />}
        </div>
        {geo && console.log(geo.slice(2, 3))}
      </Flex>
      <Flex xs="100%" lg="33.3333%">
        <div className={classes.dinamic}>
          <div className={classes.pieTitle}>
            {formatMessage({ id: "userProfile.instagram.age" })}
          </div>
          {age && <Pie
            colors={ageColors}
            data={[
              ...age.slice(0, 2).map(({ interval, ...rest }) => ({ name: `${interval.from}-${interval.to}`, ...rest})),
              { name: "Others", percentage: 100 - age.slice(0, 3).map(({ percentage }) => percentage).reduce((acc, item) => acc + item)},
              ...age.slice(2, 3).map(({ interval, ...rest }) => ({ name: `${interval.from}-${interval.to}`, ...rest})),
            ]}
          />}
        </div>
      </Flex>
    </Flex>
    <div className={classes.dinamic}>
      <div className={classes.dinamicTitle}>
        {formatMessage({ id: "userProfile.instagram.portfolio" })}
      </div>
      <div className={classes.portfolioCard} style={{ marginBottom: 30 }}>
        <Flex container spacing={5}>
          <Flex xs="100%" textCenter="xs" lg="25%">Название кампании</Flex>
          <Flex xs="100%" textCenter="xs" lg="15%">Организация</Flex>
          <Flex xs="100%" textCenter="xs" lg="15%">Площадка</Flex>
          <Flex xs="100%" textCenter="xs" lg="15%">Вовлеченность</Flex>
          <Flex xs="100%" textCenter="xs" lg="15%">Хештеги</Flex>
          <Flex xs="100%" textCenter="xs" lg="15%">Оценка</Flex>
        </Flex>
      </div>
      <Flex spacing={15} container marginBottom>
        <Flex xs="100%">
          <div className={classes.portfolioCard}>
            <Flex spacing={5} container middle="xs">
              <Flex xs="100%" lg="25%">
                <Flex nowrap container spacing={5} middle="xs">
                  <Flex>
                    <div className={classes.logo}>
                      <img src="https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg" alt="logo"/>
                    </div>
                  </Flex>
                  <Flex>
                    Продвижение образовательных
                    курсов по маркетингу
                  </Flex>
                </Flex>
              </Flex>
              <Flex xs="100%" textCenter="xs" lg="15%">Сбербанк</Flex>
              <Flex xs="100%" flex center="xs" lg="15%">
                <Instagram />
              </Flex>
              <Flex xs="100%" lg="15%" flex center="xs" style={{ fontWeight: 600 }}>
                65%
              </Flex>
              <Flex xs="100%" lg="15%" flex center="xs">#mom #dad</Flex>
              <Flex xs="100%" lg="15%" flex center="xs">8/10</Flex>
            </Flex>
          </div>
        </Flex>

        <Flex xs="100%">
          <div className={classes.portfolioCard}>
            <Flex spacing={5} container middle="xs">
              <Flex xs="100%" lg="25%">
                <Flex nowrap container spacing={5} middle="xs">
                  <Flex>
                    <div className={classes.logo}>
                      <img src="https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg" alt="logo"/>
                    </div>
                  </Flex>
                  <Flex>
                    Продвижение образовательных
                    курсов по маркетингу
                  </Flex>
                </Flex>
              </Flex>
              <Flex xs="100%" textCenter="xs" lg="15%">Сбербанк</Flex>
              <Flex xs="100%" flex center="xs" lg="15%">
                <Instagram />
              </Flex>
              <Flex xs="100%" lg="15%" flex center="xs" style={{ fontWeight: 600 }}>
                65%
              </Flex>
              <Flex xs="100%" lg="15%" flex center="xs">#mom #dad</Flex>
              <Flex xs="100%" lg="15%" flex center="xs">8/10</Flex>
            </Flex>
          </div>
        </Flex>

        <Flex xs="100%">
          <div className={classes.portfolioCard}>
            <Flex spacing={5} container middle="xs">
              <Flex xs="100%" lg="25%">
                <Flex nowrap container spacing={5} middle="xs">
                  <Flex>
                    <div className={classes.logo}>
                      <img src="https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg" alt="logo"/>
                    </div>
                  </Flex>
                  <Flex>
                    Продвижение образовательных
                    курсов по маркетингу
                  </Flex>
                </Flex>
              </Flex>
              <Flex xs="100%" textCenter="xs" lg="15%">Сбербанк</Flex>
              <Flex xs="100%" flex center="xs" lg="15%">
                <Instagram />
              </Flex>
              <Flex xs="100%" lg="15%" flex center="xs" style={{ fontWeight: 600 }}>
                65%
              </Flex>
              <Flex xs="100%" lg="15%" flex center="xs">#mom #dad</Flex>
              <Flex xs="100%" lg="15%" flex center="xs">8/10</Flex>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </div>
  </div>
}

export default Blogger;