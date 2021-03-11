import React from 'react';
import useIntl from "react-intl/lib/src/components/useIntl";
import { useSelector } from "react-redux";
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import Loader from "../../components/global/Loader";
import Column from "../../components/global/Diagrams/Column";
import Instagram from "../../components/icons/Instagram";
import Tooltip from "../../components/global/Tooltip";
import Tip from "../../components/icons/Tip";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Portfolio = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div>
      <Flex container spacing={20} middle="xs">
        <Flex>
          <div className={classes.logo}>
            <img src="https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg" alt="logo"/>
          </div>
        </Flex>
        <Flex>
          <div className={classes.title}>
            Продвижение образовательных курсов по маркетингу
            <div className={classes.platform}>
              <Instagram />Сториз
            </div>
          </div>
        </Flex>
        <Flex>
          <Flex spacing={10} container middle="xs">
            <Flex>
              <div className={classes.rating}>9/10</div>
            </Flex>
            <Flex>
              <Tooltip offset={5} title="tip">
                <div style={{ display: "flex" }}>
                  <Tip />
                </div>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <div style={{ margin: "15px 0" }}>
        <Flex container spacing={10} marginBottom middle="xs">
          <Flex>
            {formatMessage({ id: "portfolio.theme" })}
          </Flex>
          <Flex>
            <div className={classes.theme}>
              Категория 1
            </div>
          </Flex>
          <Flex>
            <div className={classes.theme}>
              Категория 2
            </div>
          </Flex>
          <Flex>
            <div className={classes.theme}>
              Категория 3
            </div>
          </Flex>
          <Flex>
            <div className={classes.theme}>
              Категория 4
            </div>
          </Flex>
        </Flex>
      </div>
      <div className={classes.container}>
        <Flex spacing={20} container marginBottom>
          <Flex xs="100%" removeMargin>
            <Flex container spacing={20} marginBottom>
              <Flex xs="100%" lg="50%">
                <div className={classes.card}>
                  <Flex container spacing={10} middle="xs">
                    <Flex>
                      <div className={classes.logo}>
                        <img src="https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg" alt="logo"/>
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.name}>
                        Екатерина
                      </div>
                      <div className={classes.company}>
                        Пятерочка
                      </div>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
              <Flex xs="100%" lg="50%">
                <div className={classes.card}>
                  <Flex container spacing={10} between="xs" middle="xs" nowrap>
                    <Flex>
                      <div className={classes.statisticsTitle}>
                        {formatMessage({ id: "portfolio.touchedAuditory" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.statisticsPercentage}>
                        33%
                      </div>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
              <Flex xs="100%" lg="50%">
                <div className={classes.card}>
                  <Flex container spacing={10} between="xs" middle="xs" nowrap>
                    <Flex>
                      <div className={classes.statisticsTitle}>
                        {formatMessage({ id: "portfolio.engagementIndex" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.statisticsPercentage}>
                        33%
                      </div>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
              <Flex xs="100%" lg="50%">
                <div className={classes.card}>
                  <Flex container spacing={10} between="xs" middle="xs" nowrap>
                    <Flex>
                      <div className={classes.statisticsTitle}>
                        {formatMessage({ id: "portfolio.attractiveLevel" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.statisticsPercentage}>
                        33%
                      </div>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </Flex>
          <Flex xs="100%">
            <div className={classes.card} style={{ display: "block" }}>
              <Column fontSize={md ? 16 : 12} />
            </div>
          </Flex>
          <Flex xs="100%">
            <div className={classes.card}>
              <Flex spacing={10} container marginBottom>
                <Flex xs="100%">
                  <Flex spacing={10} container between="xs" middle="xs">
                    <Flex>
                      <div className={classes.priceTitle}>
                        {formatMessage({ id: "portfolio.subscribePrice" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.price}>
                        100 ₽
                      </div>
                    </Flex>
                  </Flex>
                  <div className={classes.seporator}/>
                </Flex>
                <Flex xs="100%">
                  <Flex spacing={10} container between="xs" middle="xs">
                    <Flex>
                      <div className={classes.priceTitle}>
                        {formatMessage({ id: "portfolio.followingPrice" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.price}>
                        100 ₽
                      </div>
                    </Flex>
                  </Flex>
                  <div className={classes.seporator}/>
                </Flex>
                <Flex xs="100%">
                  <Flex spacing={10} container between="xs" middle="xs">
                    <Flex>
                      <div className={classes.priceTitle}>
                        {formatMessage({ id: "portfolio.clickPrice" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.price}>
                        100 ₽
                      </div>
                    </Flex>
                  </Flex>
                  <div className={classes.seporator}/>
                </Flex>
                <Flex xs="100%">
                  <Flex spacing={10} container between="xs" middle="xs">
                    <Flex>
                      <div className={classes.priceTitle}>
                        {formatMessage({ id: "portfolio.price1000Shows" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.price}>
                        100 ₽
                      </div>
                    </Flex>
                  </Flex>
                  <div className={classes.seporator}/>
                </Flex>
                <Flex xs="100%">
                  <Flex spacing={10} container between="xs" middle="xs">
                    <Flex>
                      <div className={classes.priceTitle}>
                        {formatMessage({ id: "portfolio.price1000Coverage" })}
                      </div>
                    </Flex>
                    <Flex>
                      <div className={classes.price}>
                        100 ₽
                      </div>
                    </Flex>
                  </Flex>
                  <div className={classes.seporator}/>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Flex>
      </div>
      <div className={classes.reviewTitle}>
        {formatMessage({ id: "portfolio.review" })}
      </div>
      <div className={classes.card}>
        <Flex container spacing={20} middle="xs" nowrap>
          <Flex>
            <div className={classes.reviewAva}>
              <img src="https://101zabava.club/wp-content/uploads/2019/02/11-184.jpg" alt="logo"/>
            </div>
          </Flex>
          <Flex>
            <div className={classes.reviewCompany}>
              ООО “Пятерочка”
            </div>
            <div className={classes.reviewText}>
              Мы взаимодействуем с организацией Сибирьтрейдопт Новосибирск в течении долгих лет. Определенные достижения стали выполнимы благодаря упорядоченной практике.
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}

export default Portfolio;