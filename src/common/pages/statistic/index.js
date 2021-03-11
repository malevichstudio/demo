import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import useIntl from "react-intl/lib/src/components/useIntl";
import classNames from "classnames";
import useStyles from "./styles";
import Button from "@material-ui/core/Button";
import Download from "../../components/icons/Download";
import Flex from "../../components/global/Flex";
import Temp from "../../components/temp";
import Switcher from "../../components/global/Switch";
import TextField from "@material-ui/core/TextField";
import DatePicker from 'react-datepicker';
import {locales} from "../../constants/locales";
import BlueChevronLeft from "../../components/icons/BlueChevronLeft";
import BlueChevronRight from "../../components/icons/BlueChevronRight";
import Loader from "../../components/global/Loader";

const tabs = [
  "statistics.tabs.month",
  "statistics.tabs.quarter",
  "statistics.tabs.year",
  "statistics.tabs.date",
];

const Statistic = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const loading = useSelector(state => state.me.loading);
  const role = useSelector(state => state.auth.role);
  const [currentTab, setCurrentTab] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div>
      {loading
        ? <Loader />
        : (
          <>
            <Typography className={classes.title} variant="h3">
              {formatMessage({ id: "pages.statistic" })}
              <Button
                variant="contained"
                color="secondary"
              >
                {formatMessage({ id: "action.downloadReport" })}
                <Download style={{ marginLeft: 10 }} />
              </Button>
            </Typography>
            <Flex container spacing={20} style={{ maxWidth: "100%" }}>
              <Flex xs="100%">
                <Flex xs="100%">
                  <Flex container spacing={10} marginBottom>
                    {tabs.map((item, index) => <Flex>
                      <div
                        className={classNames({
                          [classes.tab]: true,
                          "active": index === currentTab,
                        })}
                        onClick={() => setCurrentTab(index)}
                      >
                        {formatMessage({ id: item })}
                      </div>
                    </Flex>)}
                  </Flex>
                </Flex>
              </Flex>
              <Flex xs="100%">
                <Flex container spacing={20} marginBottom>
                  <Flex xs="100%" lg="auto">
                    <div className={classes.card}>
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "statistics.total" })}
                      </div>
                      <div className={classes.money}>
                        1 500 000₽
                      </div>
                      <div className={classes.description}>
                        {formatMessage({ id: "statistics.owned" })}
                      </div>
                    </div>
                  </Flex>
                  <Flex xs="100%" lg="auto">
                    <div className={classes.card}>
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "statistics.wasIn" })}
                      </div>
                      <div className={classes.values}>
                        100
                      </div>
                      <div className={classes.description}>
                        {formatMessage({ id: "statistics.companies" })}
                      </div>
                    </div>
                  </Flex>
                  <Flex xs="100%" lg="auto">
                    <div className={classes.card}>
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "statistics.youReceived" })}
                      </div>
                      <Flex spacing={20} container>
                        <Flex>
                          <div className={classes.values}>
                            9/10
                          </div>
                          <div className={classes.description}>
                            {formatMessage({ id: "statistics.myRating" })}
                          </div>
                        </Flex>
                        <Flex>
                          <div className={classes.values}>
                            150
                          </div>
                          <div className={classes.description}>
                            {formatMessage({ id: "statistics.ratingsForm" })}
                          </div>
                        </Flex>
                        <Flex>
                          <div className={classes.values}>
                            100 000
                          </div>
                          <div className={classes.description}>
                            {formatMessage({ id: "statistics.profileViews" })}
                          </div>
                        </Flex>
                      </Flex>
                    </div>
                  </Flex>
                  <Flex xs="100%" lg="auto">
                    <div className={classes.card}>
                      <div className={classes.cardTitle}>
                        {formatMessage({ id: "statistics.youPut" })}
                      </div>
                      <Flex spacing={20} container>
                        <Flex>
                          <div className={classes.values}>
                            115
                          </div>
                          <div className={classes.description}>
                            {formatMessage({ id: "statistics.AdvertisersRatings" })}
                          </div>
                        </Flex>
                        <Flex>
                          <div className={classes.values}>
                            8/10
                          </div>
                          <div className={classes.description}>
                            {formatMessage({ id: "statistics.averageRating" })}
                          </div>
                        </Flex>
                      </Flex>
                    </div>
                  </Flex>
                </Flex>
              </Flex>
              <Flex xs="100%">
                <div className={classes.companyTitle}>
                  Новогодняя кампания “Пятерочка....”
                </div>
              </Flex>
              {
                role === "Blogger" && (
                  <>
                    <Flex xs="100%">
                      <Flex spacing={20} container between="xs" middle="xs">
                        <Flex>
                          <div className={classes.companySubTitle}>Сторис</div>
                        </Flex>
                        <Flex>
                          <Flex spacing={10} container>
                            <Flex>
                              <BlueChevronLeft />
                            </Flex>
                            <Flex>
                              <BlueChevronRight />
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex xs="100%">
                      <div className={classes.card}>
                        <Temp />
                        <div className={classes.separator} />
                        <Flex spacing={20} container>
                          <Flex>
                            <div className={classes.subtitle}>
                              Показатели
                            </div>
                            <Flex spacing={20} container column marginBottom>
                              <Flex between="xs" spacing={20} container middle="xs">
                                <Flex>
                                  Охваты
                                </Flex>
                                <Flex>
                                  <Switcher />
                                </Flex>
                              </Flex>
                              <Flex between="xs" spacing={20} container middle="xs">
                                <Flex>
                                  Показы
                                </Flex>
                                <Flex>
                                  <Switcher />
                                </Flex>
                              </Flex>
                              <Flex between="xs" spacing={20} container middle="xs">
                                <Flex>
                                  Вовлечение
                                </Flex>
                                <Flex>
                                  <Switcher />
                                </Flex>
                              </Flex>
                            </Flex>
                          </Flex>
                          <Flex>
                            <div className={classes.subtitle}>
                              Ссылка на креатив
                            </div>
                            <TextField
                              fullWidth
                              variant="outlined"
                              value="instagram.com/fesszs544feaD"
                              disabled
                            />
                          </Flex>
                        </Flex>
                      </div>
                    </Flex>
                  </>
                )
              }
              <Flex xs="100%">
                <Flex spacing={20} container between="xs" middle="xs">
                  <Flex>
                    <div style={{ marginTop: 30 }} className={classes.companySubTitle}>Пост</div>
                  </Flex>
                  <Flex>
                    <Flex spacing={10} container>
                      <Flex>
                        <BlueChevronLeft />
                      </Flex>
                      <Flex>
                        <BlueChevronRight />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex xs="100%">
                <div className={classes.card}>
                  <Temp />
                  <div className={classes.separator} />
                  <Flex spacing={20} container>
                    <Flex>
                      <div className={classes.subtitle}>
                        Показатели
                      </div>
                      <Flex spacing={20} container column marginBottom>
                        <Flex between="xs" spacing={20} container middle="xs">
                          <Flex>
                            Охваты
                          </Flex>
                          <Flex>
                            <Switcher />
                          </Flex>
                        </Flex>
                        <Flex between="xs" spacing={20} container middle="xs">
                          <Flex>
                            Показы
                          </Flex>
                          <Flex>
                            <Switcher />
                          </Flex>
                        </Flex>
                        <Flex between="xs" spacing={20} container middle="xs">
                          <Flex>
                            Вовлечение
                          </Flex>
                          <Flex>
                            <Switcher />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex>
                      <div className={classes.subtitle}>
                        Ссылка на креатив
                      </div>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value="instagram.com/fesszs544feaD"
                        disabled
                      />
                    </Flex>
                    <Flex>
                      <div className={classes.subtitle}>
                        Выбор периода
                      </div>
                      <DatePicker
                        locale={locales["ru_RU"]}
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                      />
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </>
        )}
    </div>
  )
};

export default Statistic;