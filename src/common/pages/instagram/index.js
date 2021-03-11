import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useIntl from "react-intl/lib/src/components/useIntl";
import Back from "../../components/icons/Back";
import routes from "../../routes";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import Button from "@material-ui/core/Button";
import Switcher from "../../components/global/Switch";
import TextField from "@material-ui/core/TextField";
import Instagram from "../../components/icons/Instagram";
import {deleteBloggerInstagram, getBloggerInstagram} from "../../../store/actions/bloggerAccount";
import LoaderWrap from "../../components/global/LoaderWrap";
import { format } from "../../helpers/DateHelper";
import {statuses} from "../../constants/companiesStatuses";
import BaseSelect from "../../components/global/BaseSelect";
import Area from "../../components/global/Diagrams/Area";
import Pie from "../../components/global/Diagrams/Pie";
import {find} from "lodash";
import {platforms} from "../../constants/platforms";
import ConfirmModal from "../../components/modals/ConfirmModal";
import Http from "../../../http";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import FormSelect from "../../components/global/FormSelect";
import FormInput from "../../components/global/FormInput";
import {commercialFormatsOptions} from "../../constants/commercialFormats";

const ProfileInstagram = () => {
  const dispatch = useDispatch();
  const inst = useSelector(state => state.bloggerAccount.data.instagram);
  const loading = useSelector(state => state.bloggerAccount.loading);
  const followersStatistics = useSelector(state => state.bloggerAccount.data?.instagram?.followersStatistics);
  const sex = useSelector(state => state.bloggerAccount.data?.instagram?.audienceGroupPercentage);
  const age = useSelector(state => state.bloggerAccount.data?.instagram?.ageIntervals);
  const geo = useSelector(state => state.bloggerAccount.data?.instagram?.geo);
  const socialNetworks = useSelector(state => state.me.data.socialNetworks);
  const instagramId = find(socialNetworks, ["socialNetworkId", platforms[0].id])?.id
  const { push } = useHistory();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { formatMessage } = useIntl();
  const isAuth = useSelector(state => state.auth.isAuth);
  const classes = useStyles();
  const ValidationSchema = Yup.object().shape({
    advertType: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
    price: Yup.number().typeError(formatMessage({ id: 'inputErrors.type.number' })).required(formatMessage({ id: 'inputErrors.required' })),
  });
  const { handleSubmit, control, errors, reset  } = useForm({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      advertType: '131231',
      price: "",
    }
  });
  const onSubmit = ({ price, advertType }) => {
    setCommercialFormats(prev => [...prev, {
      advertType: {
        id: advertType,
      },
      price,
    }])
    reset();
  };
  const onEditCancel = () => {
    setIsEdit(false);
    setCommercialFormats(inst?.advertisementTypeAndPrice || []);
  }
  const [commercialFormats, setCommercialFormats] = useState([]);
  const onEdit = () => {
    Http.put(`/ident/v1/blogger/account/${inst.id}/advertisiment-type-and-price`, commercialFormats)
      .then(() => setIsEdit(false));
  }
  useEffect(() => {
    if(isAuth && instagramId){
      dispatch(getBloggerInstagram(instagramId));
    }
  }, [isAuth, instagramId])
  useEffect(() => {
      setCommercialFormats(inst?.advertisementTypeAndPrice || []);
  }, [inst])

  const geoColors = ["#2789AE", "#20B5EE" ,"#D9D6D6" ,"#20B5EE"];
  const sexColors = ["#2789AE", "#20B5EE" ,"#D9D6D6" ,"#20B5EE"];
  const ageColors = ["#2789AE", "#20B5EE" ,"#D9D6D6" ,"#20B5EE"];

  return (
    <LoaderWrap loading={loading || !Boolean(inst)}>
      <ConfirmModal
        show={isConfirmOpen}
        hideModal={() => setIsConfirmOpen(false)}
        message={formatMessage({ id: "confirm.isDeleteAcc" })}
        onConfirm={() => {
          push(routes.profile);
          dispatch(deleteBloggerInstagram());
        }}
      />
      <Flex container middle="xs" spacing={20} marginBottom>
        <Flex xs="100%" lg="auto">
          <Typography className={classes.pagetitle} onClick={() => push(routes.profile)} variant="h3">
            <Back />Аккаунт {inst?.userName}
          </Typography>
        </Flex>
        <Flex>
          {
            `${formatMessage({ id: "userProfile.instagram.actualData" })} ${inst?.lastUpdateDate && format(new Date(inst?.lastUpdateDate))}`
          }
        </Flex>
      </Flex>
      <Flex container middle="xs" spacing={20} marginBottom>
        <Flex grow="xs" flex middle="xs">
          <Switcher />
          {formatMessage({ id: "userProfile.instagram.hidePortfolio" })}
        </Flex>
        <Flex>
          <Button color="secondary" variant="contained">
            {formatMessage({ id: "userProfile.instagram.portfolio"})}
          </Button>
        </Flex>
        <Flex>
          {!isEdit && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setIsEdit(true)}
            >
              {formatMessage({ id: "action.edit"})}
            </Button>
          )}
          {isEdit && (
            <Flex container spacing={20}>
              <Flex>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={onEditCancel}
                >
                  {formatMessage({ id: "action.cancel"})}
                </Button>
              </Flex>
              <Flex>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onEdit}
                >
                  {formatMessage({ id: "action.save"})}
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex container spacing={30}>
        <Flex xs="100%" xl="840px">
          <div className={classes.title}>
            {formatMessage({ id: "userProfile.instagram.commonInfo" })}
          </div>
          <Flex marginBottom spacing={20} container>
            <Flex xs="100%" lg="50%">
              <Flex container spacing={20} marginBottom>
                <Flex xs="100%">
                  <TextField
                    defaultValue={inst?.userName}
                    variant="outlined"
                    disabled
                    fullWidth
                    label={formatMessage({ id: "userProfile.instagram.nickname" })}
                  />
                </Flex>
                <Flex xs="100%">
                  <TextField
                    variant="outlined"
                    disabled
                    defaultValue={inst?.description}
                    fullWidth
                    style={{ height: 208 }}
                    multiline
                    rows={5}
                    label={formatMessage({ id: "userProfile.instagram.blogDescription" })}
                  />
                </Flex>
                <Flex xs="100%">
                  <TextField
                    variant="outlined"
                    disabled
                    defaultValue={inst?.userName}
                    fullWidth
                    label={formatMessage({ id: "userProfile.instagram.country" })}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex xs="100%" lg="50%">
              <Flex container spacing={20} marginBottom>
                <Flex xs="100%">
                  <div className={classes.fakeInput}>
                  <div className={classes.fakeLabel}>
                    {formatMessage({ id: "stepForm.platform" })}
                  </div>
                    <div className={classes.iconWrap}>
                      <Instagram/>
                    </div>
                </div>
                </Flex>
                <Flex xs="100%">
                  <TextField
                    variant="outlined"
                    disabled
                    defaultValue={inst?.commentsAverage}
                    fullWidth
                    label={formatMessage({ id: "userProfile.instagram.commentAverage" })}
                  />
                </Flex>
                <Flex xs="100%">
                  <Flex container spacing={20}>
                    <Flex xs="100%" lg="50%">
                      <TextField
                        variant="outlined"
                        disabled
                        defaultValue={Math.floor(inst?.engagementRatePercent)}
                        fullWidth
                        label={formatMessage({ id: "userProfile.instagram.engagement" })}
                      />
                    </Flex>
                    <Flex xs="100%" lg="50%">
                      <TextField
                        variant="outlined"
                        disabled
                        defaultValue={`${inst?.accountRating}/10`}
                        fullWidth
                        label={formatMessage({ id: "userProfile.instagram.rating" })}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex xs="100%">
                  <TextField
                    variant="outlined"
                    disabled
                    defaultValue={inst?.subscribersCount}
                    fullWidth
                    label={formatMessage({ id: "userProfile.instagram.subscribersCount" })}
                  />
                </Flex>
                <Flex xs="100%">
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    defaultValue={inst?.userName}
                    label={formatMessage({ id: "userProfile.instagram.city" })}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex xs="100%" style={{ marginBottom: 10 }}>
        <div className={classes.title}>
          {formatMessage({ id: "userProfile.instagram.theme" })}
        </div>
        <Flex container spacing={10} marginBottom>
          {inst && inst.interests.map((item) => <Flex>
            <div className={classes.category}>{item?.value?.description || "category"}</div>
          </Flex>)}
        </Flex>
      </Flex>
      <Flex container spacing={30}>
        <Flex xs="100%" xl="840px">
          <div className={classes.title}>
            {formatMessage({ id: "userProfile.instagram.commercialFormat" })}
          </div>
          <Flex spacing={20} container marginBottom>
            <Flex xs="100%">
              {commercialFormats.map((item) => {
                return (
                  <Flex container spacing={20} marginBottom>
                    <Flex xs="100%" lg="415px">
                      <BaseSelect
                        name="advertType"
                        isIntl
                        disabled
                        fullWidth
                        value={item?.advertType?.id}
                        options={commercialFormatsOptions}
                        label={formatMessage({ id: "userProfile.instagram.commercialFormat" })}
                      />
                    </Flex>
                    <Flex>
                      <TextField
                        name="price"
                        fullWidth
                        disabled
                        value={item?.price}
                        variant="outlined"
                        label={formatMessage({ id: "userProfile.instagram.priceFrom" })}
                      />
                    </Flex>
                  </Flex>
                )
              })}
              {isEdit && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex container spacing={20} marginBottom>
                    <Flex xs="100%" lg="415px">
                      <FormSelect
                        name="advertType"
                        control={control}
                        error={errors.advertType}
                        errors={errors}
                        isIntl
                        fullWidth
                        options={commercialFormatsOptions}
                        label={formatMessage({ id: "userProfile.instagram.commercialFormat" })}
                      />
                    </Flex>
                    <Flex>
                      <FormInput
                        error={errors.price}
                        errors={errors}
                        name="price"
                        control={control}
                        fullWidth
                        variant="outlined"
                        label={formatMessage({ id: "userProfile.instagram.priceFrom" })}
                      />
                    </Flex>
                    <Flex>
                      <Button
                        color="secondary"
                        variant="contained"
                        type="submit"
                      >
                        Добавить
                      </Button>
                    </Flex>
                  </Flex>
                </form>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex container spacing={30}>
        <Flex xs="100%">
          <div className={classes.title}>
            {formatMessage({ id: "userProfile.instagram.subscribersDynamics" })}
          </div>
        </Flex>
        <Flex spacing={20} container marginBottom>
          <Flex xs="100%">
            <Flex container spacing={20} marginBottom>
              <Flex xs="100%" lg="50%">
                <div className={classes.dinamic}>
                  <Flex spacing={20} container between="xs">
                    <Flex>
                      <div className={classes.dinamicTitle}>
                        {formatMessage({ id: "userProfile.instagram.subscribersStatistic" })}
                      </div>
                    </Flex>
                  </Flex>
                  {followersStatistics && <Area data={followersStatistics.map(({ date, count }) => ([new Date(date), count]))} />}
                </div>
              </Flex>
              <Flex xs="100%" lg="50%">
                <div className={classes.dinamic}>
                  <Flex spacing={20} container between="xs" middle="xs">
                    <Flex>
                      <div className={classes.dinamicTitle}>
                        {formatMessage({ id: "userProfile.instagram.subscribersStatistic" })}
                      </div>
                    </Flex>
                    <Flex>
                      {formatMessage({ id: "userProfile.instagram.unsub" })}
                    </Flex>
                  </Flex>
                  {followersStatistics && <Area data={followersStatistics.map(({ date, count }) => ([new Date(date), count]))} />}
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex container spacing={30}>
        <Flex xs="100%">
          <div className={classes.title}>
            {formatMessage({ id: "userProfile.instagram.audienceComposition" })}
          </div>
        </Flex>
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
        <Flex xs="100%" flex center="xs" style={{ marginTop: 30 }}>
          <Button variant="outlined" color="secondary" onClick={() => setIsConfirmOpen(true)}>
            {formatMessage({ id: "userProfile.instagram.deleteAcc" })}
          </Button>
        </Flex>
      </Flex>
    </LoaderWrap>
  )
};

export default ProfileInstagram;