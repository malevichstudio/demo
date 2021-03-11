import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { yupResolver } from "@hookform/resolvers";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import FormInput from "../../components/global/FormInput";
import FormSelect from "../../components/global/FormSelect";
import FormDatepicker from "../../components/global/FormDatepicker";
import { paymentModels } from "../../constants/paymentModels";
import Switcher from "../../components/global/Switch";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { useHistory, useParams } from "react-router-dom";
import routes from "../../routes";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import {createCompany, editCompany, getCompany} from "../../../store/actions/companies";
import PriceAttractive from "../../components/global/PriceAttractive";
import Ruble from "../../components/icons/Ruble";
import Http from "../../../http";
import BaseAutocomplete from "../../components/global/BaseAutocomplite";
import { paymentTypes } from "../../constants/paymentsTypes";
import FileLoader from "../../components/global/FileLoader";
import Loader from "../../components/global/Loader";
import FileBox from "../../components/global/FileBox";
import {toast} from "react-toastify";
import LSHelper from "../../helpers/LocalStorageHelper";

const steps = [
  {
    name: "companySteps.step1",
  },
  {
    name: "companySteps.step2",
  },
  {
    name: "companySteps.step3",
  },
  {
    name: "companySteps.step4",
  },
  {
    name: "companySteps.step5",
  },
];

const paymentModelsTips = {
  "Standard" : "paymentsModel.tip.standard",
  "CPA" : "paymentsModel.tip.cpa",
  "Mixed" : "paymentsModel.tip.mixed",
};

const cpaLabels = {
  "Views": "stepForm.cpaPrice.views",
  "Clicks": "stepForm.cpaPrice.click",
}

const StepContent = ({ currentStep, index , children }) => {
  return <div style={{ display: currentStep === index ? "block": "none"}}>{children}</div>
}

const CompanyNew = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const { id: companyId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.companies.loading);
  const isAuth = useSelector(state => state.auth.isAuth);
  const parentCategories = useSelector(state => state.companies.profileCategories);
  const company = useSelector(state => {
    if(!companyId){
      return false
    }
    return state.companies.company;
  });
  const [categoriesTree, setCategoriesTree] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isPercent, setIsPercent] = useState("goalPrice");
  const [logo, setLogo] = useState({ loading: false, url : "" });
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  useEffect(() => {
    setCategoriesTree([{
      items: [...parentCategories.map((item) => ({...item, name: item.description }))],
      current: null,
      searchField: "",
    }]);
  }, [parentCategories])
  useEffect(() => {
    setLogo({ loading: false, url : company?.logo?.uri })
    if(company.campaignPayment?.mixed?.percent){
      setIsPercent("percent");
    }
    if(company.creative?.pathsToMaterials){
      setCreatives(company.creative.pathsToMaterials.map(({ uri }) => uri))
    } else {
      setCreatives([])
    }
    if(company.productCategories){
      setSelectedCategories(company.productCategories.map(({ value }) => value))
    } else {
      setSelectedCategories([])
    }
  }, [company]);
  useEffect(() => {
    if(isAuth && companyId){
      dispatch(getCompany(companyId))
    }
  }, [isAuth]);
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
    description: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
    plannedBudget: Yup.number().typeError(formatMessage({ id: 'inputErrors.type.number' })).required(formatMessage({ id: 'inputErrors.required' })),
    countOfBloggers: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    countOfSubscribers: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    rating: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    engagementRate: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    averagePostComments: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    cpaPrice: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    fixedPrice: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
    goalPrice: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })),
  });
  const { handleSubmit, control, errors, watch } = useForm({
    defaultValues: {
      hiddenCampaign: false,
      publishRightAfterModeration: false,
      detailsOnlyForApprovedBloggers: false,
    },
    resolver: yupResolver(ValidationSchema),
  });
  useEffect(() => {
    if(!isEmpty(errors)){
      toast.error(formatMessage({ id: "stepForm.validationError" }));
    }
  }, [errors])
  const onSubmit = ({
    from,
    to,
    paymentModel,
    paymentType,
    cpaPrice,
    fixedPrice,
    goalPrice,
    ...rest
  }) => {
    let campaignPayment = {
      paymentModel,
    }
    if(paymentModel === "CPA"){
      campaignPayment ={
        ...campaignPayment,
        cpa: {
          price1000Views: cpaPrice,
        },
        paymentType,
      }
    }
    if(paymentModel === "Mixed"){
      campaignPayment = {
        ...campaignPayment,
        mixed: {
          price1000Views: cpaPrice,
          fixedPrice,
          [isPercent]: goalPrice,
        },
        paymentType,
      }
    }
    const data = {
      productCategories: selectedCategories.map(({ id }) => ({ id })),
      period: {
        from,
        to,
      },
      creative: {
        pathsToMaterials: creatives.map((uri) => ({ uri })),
      },
      logo: {
        uri: logo.url || undefined,
      },
      campaignPayment,
      campaignStatus: 0,
      ...rest,
    };
    if(companyId){
      dispatch(editCompany(
        data,
        companyId,
        () => push(`/app/companies/company/${companyId}`),
      ))
    } else {
      dispatch(createCompany(
        data,
        () => push(routes.companies),
      ))
    }
  };
  const selectedCategory = categoriesTree[categoriesTree.length - 1]?.current;
  const paymentModel = watch("paymentModel");
  const publishRightAfterModeration = watch("publishRightAfterModeration");
  const onNextClick = () => {
    if(activeStep !== steps.length - 1){
      setTimeout(() => setActiveStep(activeStep + 1), 100);
    }
  };
  const addCategoryHandler = () => {
    if(selectedCategory){
      setSelectedCategories(prev => [...prev, selectedCategory]);
      setCategoriesTree([{
        items: [...parentCategories.map((item) => ({...item, name: item.description }))],
        current: null,
        searchField: "",
      }]);
    }
  };
  return (
    <div>
      <ConfirmModal
        show={isConfirmOpen}
        hideModal={() => setIsConfirmOpen(false)}
        message={formatMessage({ id: "confirm.isCancelCreate" })}
        onConfirm={() => push(routes.companies)}
      />
      <Flex flex between middle="xs" className={classes.title}>
        <Typography variant="h3">
          {formatMessage({ id: `pages.${companyId ? "editCompany" : "newCompany"}` })}
        </Typography>
        {md && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsConfirmOpen(true)}
          >Отмена</Button>
        )}
      </Flex>
      <div className={classes.stepHeader}>
        {
          lg
            ? (
              steps.map(({ name }, index) => {
                  const rootClasses = classNames({
                    [classes.stepIndex]: true,
                    "active": index === activeStep,
                  })
                  return (
                    <Flex xs="20%" key={name} flex column middle="xs" center="xs">
                      <div onClick={() => setActiveStep(index)} className={rootClasses}>{index + 1}</div>
                      <div className={classes.stepLabel}>{formatMessage({ id: name })}</div>
                    </Flex>
                  )
                })
            )
            : (
              <Flex flex column middle="xs" center="xs">
                <div className={classNames({ [classes.stepIndex]: true, "active": true })}>
                  {activeStep + 1}
                </div>
                <div className={classes.stepLabel}>{formatMessage({ id: steps[activeStep].name })}</div>
              </Flex>
            )
        }
      </div>
      {
        (loading && companyId)
          ? <Loader/>
          : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <StepContent currentStep={activeStep} index={0}>
                <div className={classes.stepWrap}>
                  <div className={classes.stepInner}>
                    <div className={classes.stepInputWrap}>
                      <FormInput
                        error={errors.name}
                        errors={errors}
                        name="name"
                        defaultValue={companyId ? company.name : undefined}
                        label={<span>{formatMessage({ id: "stepForm.companyName"})}<span style={{ color: "red"}}>*</span></span>}
                        control={control}
                        fullWidth
                        hint={formatMessage({ id: "stepForm.companyName.hint" })}
                      />
                      <Flex style={{ marginTop: 30 }} container nowrap spacing={20}>
                        <Flex container column spacing={20} marginBottom>
                          <Flex>
                            <FormInput
                              error={errors.plannedBudget}
                              errors={errors}
                              defaultValue={company.plannedBudget}
                              name="plannedBudget"
                              label={<span>{formatMessage({ id: "stepForm.budget" })}<span style={{ color: "red" }}>*</span></span>}
                              control={control}
                              fullWidth
                            />
                          </Flex>
                          <Flex>
                            <FormDatepicker
                              error={errors.from}
                              errors={errors}
                              control={control}
                              name="from"
                              defaultValue={company.period?.from}
                              textFiledProps={{
                                label: formatMessage({ id: "stepForm.from"})
                              }}
                            />
                          </Flex>
                          <Flex>
                            <FormDatepicker
                              error={errors.to}
                              errors={errors}
                              control={control}
                              name="to"
                              defaultValue={company.period?.to}
                              textFiledProps={{
                                label: formatMessage({ id: "stepForm.to"})
                              }}
                            />
                          </Flex>
                          <Flex>
                            <FormInput
                              error={errors.countOfBloggers}
                              errors={errors}
                              name="countOfBloggers"
                              defaultValue={company.countOfBloggers}
                              label={formatMessage({ id: "stepForm.bloggersCount" })}
                              control={control}
                              fullWidth
                            />
                          </Flex>
                          <Flex>
                            <FormSelect
                              options={paymentModels}
                              name="paymentModel"
                              tip={paymentModel && formatMessage({ id: paymentModelsTips[paymentModel] })}
                              defaultValue={company.campaignPayment?.paymentModel}
                              fullWidth
                              isIntl
                              label={formatMessage({ id: "stepForm.paymentModel" })}
                              control={control}
                              error={errors.paymentModel}
                              errors={errors}
                            />
                          </Flex>
                          {paymentModel === "CPA" && (
                            <>
                              <Flex>
                                <FormSelect
                                  options={paymentTypes.slice(0, 2)}
                                  name="paymentType"
                                  defaultValue={company.campaingPayment?.paymentType}
                                  fullWidth
                                  isIntl
                                  label={formatMessage({ id: "stepForm.paymentType" })}
                                  control={control}
                                  error={errors.paymentType}
                                  errors={errors}
                                />
                              </Flex>
                              {watch("paymentType") && watch("paymentType") !== "Goal" && (
                                <Flex>
                                  <FormInput
                                    error={errors.cpaPrice}
                                    errors={errors}
                                    name="cpaPrice"
                                    defaultValue={company.campaingPayment?.cpa?.price1000Views}
                                    label={formatMessage({ id: cpaLabels[watch("paymentType")] })}
                                    control={control}
                                    fullWidth
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Ruble />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  <PriceAttractive type={watch('paymentType')} price={watch("cpaPrice")}/>
                                </Flex>
                              )}
                            </>
                          )}
                          {paymentModel === "Mixed" && (
                            <>
                              <Flex>
                                <FormInput
                                  error={errors.fixedPrice}
                                  errors={errors}
                                  name="fixedPrice"
                                  defaultValue={company.campaignPayment?.mixed?.fixedPrice}
                                  label={formatMessage({ id: "stepForm.fixedPrice" })}
                                  control={control}
                                  fullWidth
                                />
                              </Flex>
                              <Flex>
                                <FormSelect
                                  options={paymentTypes}
                                  name="paymentType"
                                  defaultValue={company.campaignPayment?.paymentType}
                                  fullWidth
                                  isIntl
                                  label={formatMessage({ id: "stepForm.paymentType" })}
                                  control={control}
                                  error={errors.paymentType}
                                  errors={errors}
                                />
                              </Flex>
                              <Flex>
                                <div>{formatMessage({ id: "stepForm.goalBloggerPayment" })}</div>
                                <RadioGroup style={{ flexDirection: "row" }} name="isPercent" value={isPercent} onChange={(event) => setIsPercent(event.target.value)}>
                                  <FormControlLabel value="goalPrice" control={<Radio />} label={formatMessage({ id: "stepForm.price.label" })} />
                                  <FormControlLabel value="percent" control={<Radio />} label={formatMessage({ id: "stepForm.percent.label" })} />
                                </RadioGroup>
                              </Flex>
                              <Flex>
                                <FormInput
                                  error={errors.goalPrice}
                                  errors={errors}
                                  defaultValue={company.campaignPayment?.mixed?.goalPrice || company.campaignPayment?.mixed?.percent}
                                  name="goalPrice"
                                  label={formatMessage({ id: isPercent === 'percent' ? "stepForm.percent.label" : "stepForm.price.label" })}
                                  control={control}
                                  fullWidth
                                />
                              </Flex>
                            </>
                          )}
                        </Flex>
                        {md && (
                          <Flex lg="270px" md="320px">
                            <div style={{ backgroundImage: `url('${logo?.url}')` }} className={classes.logo}>
                              {
                                logo.loading
                                  ? <Loader local />
                                  : (
                                    <Link underline="always" >
                                      <FileLoader
                                        id="logo"
                                        onSuccess={(res) => setLogo({ loading : false, url : res.headers.location })}
                                        setLoading={() => setLogo(prev => ({...prev, loading : true }))}
                                      >
                                        Загрузить изображение
                                      </FileLoader>
                                    </Link>
                                  )
                              }
                            </div>
                          </Flex>
                        )}
                      </Flex>
                    </div>
                  </div>
                </div>
              </StepContent>
              <StepContent currentStep={activeStep} index={1}>
                <div className={classes.stepWrap}>
                  <div className={classes.stepInputWrap}>
                    <Flex middle="xs" container spacing={20} marginBottom>
                      <Flex xs="100%" lg="50%">
                        <FormInput
                          error={errors.countOfSubscribers}
                          errors={errors}
                          defaultValue={company.countOfSubscribers}
                          name="countOfSubscribers"
                          label={formatMessage({ id: "stepForm.subscribers" })}
                          control={control}
                          fullWidth
                        />
                      </Flex>
                      <Flex xs="100%" lg="50%">
                        <FormSelect
                          options={[{ value: "ed2d6b05-8b13-46c5-b755-43081aee72c9", label: "Instagram" }]}
                          name="socialNetwork"
                          fullWidth
                          defaultValue={company.socialNetwork?.id}
                          isIntl
                          label={formatMessage({ id: "stepForm.platform" })}
                          control={control}
                          error={errors.socialNetwork}
                          errors={errors}
                        />
                      </Flex>
                      <Flex xs="100%" lg="50%">
                        <FormInput
                          error={errors.engagementRate}
                          errors={errors}
                          name="engagementRate"
                          defaultValue={company.engagementRate}
                          label={formatMessage({ id: "stepForm.engagementIndex" })}
                          control={control}
                          fullWidth
                        />
                      </Flex>
                      <Flex xs="100%" lg="50%">
                        <FormInput
                          error={errors.averagePostComments}
                          errors={errors}
                          name="averagePostComments"
                          defaultValue={company.averagePostComments}
                          label={formatMessage({ id: "stepForm.comments" })}
                          control={control}
                          fullWidth
                        />
                      </Flex>
                      <Flex xs="100%" lg="50%">
                        <FormInput
                          error={errors.rating}
                          errors={errors}
                          name="rating"
                          defaultValue={company.rating}
                          label={formatMessage({ id: "stepForm.rating" })}
                          control={control}
                          fullWidth
                        />
                      </Flex>
                      <Flex xs="100%" lg="50%" flex middle="xs">
                        <Controller
                          error
                          defaultValue={company.onlyRegisteredUsers}
                          render={props => <Switcher error={errors.onlyRegisteredUsers} checked={props.value} onChange={(e, val) => props.onChange(val)} />}
                          name="onlyRegisteredUsers"
                          control={control}
                        />
                        <span>
                          {formatMessage({ id: 'stepForm.onlySingIn' })}
                        </span>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </StepContent>
              <StepContent currentStep={activeStep} index={2}>
                <div className={classes.stepWrap}>
                  <div className={classes.stepInner}>
                    <div className={classes.stepInputWrap}>
                      <Flex container spacing={20} marginBottom column middle="xs">
                        <Flex container spacing={5} marginBottom xs="100%" lg="50%">
                          {selectedCategories.map((item, index) => (
                              <Flex flex middle="xs">
                                <div className={classes.tag}>
                                  {item?.description}
                                </div>
                                <div
                                  onClick={() => setSelectedCategories(prev => {
                                    const proxy = [...prev];
                                    proxy.splice(index, 1);
                                    return proxy;
                                  })}
                                  className={classes.tagCloser}
                                />
                              </Flex>
                            )
                          )}
                        </Flex>
                        {categoriesTree.map(({ items, current, searchField }, index) => {
                          return (
                            <Flex xs="100%" lg="50%">
                              <BaseAutocomplete
                                className={classes.input}
                                value={current}
                                inputValue={searchField}
                                options={items.map(({ description, id, name }) => ({ description, id, name }))}
                                label={formatMessage({ id: index === 0 ? "stepForm.category" : "stepForm.subcategory" })}
                                getOptionLabel={(option) => option.name}
                                onInputChange={(event, value) => {
                                  setCategoriesTree(prev => {
                                    const proxy = [...prev];
                                    proxy[index].searchField = value;
                                    return proxy;
                                  })
                                }}
                                onChange={(e, val) => {
                                  const currentCategoryId = val?.id;
                                  Http.get(`/enums/v1/account-category/${currentCategoryId}`)
                                    .then(({ data: { data } }) => {
                                      setCategoriesTree(prev => {
                                        const proxy = [...prev];
                                        proxy[index].current = val;
                                        if(data.length && (index === 0 || proxy[index - 1].current.id !== val.id)){
                                          proxy[index + 1] = {
                                            items: [
                                              { id: val.id , description: val.description , name: `${formatMessage({ id: "stepForm.category.all" })}(${val.name})` },
                                              ...data.map((item) => ({...item, name: item.description })) ,
                                            ],
                                            current: null,
                                            searchString: "",
                                          };
                                        } else {
                                          proxy.splice(index + 1)
                                        }
                                        return proxy;
                                      })
                                    })
                                }}
                              />
                            </Flex>
                          )
                        })}
                        <Flex xs="100%" lg="50%">
                          <Button
                            disabled={!selectedCategory || selectedCategories.length > 4}
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={addCategoryHandler}
                          >Добавить</Button>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                </div>
              </StepContent>
              <StepContent currentStep={activeStep} index={3}>
                <div className={classes.stepWrap}>
                  <div className={classes.stepInner}>
                    <div className={classes.stepInputWrap}>
                      <Flex container spacing={20} marginBottom>
                        <Flex xs="100%" lg="50%">
                          <FormInput
                            error={errors.description}
                            errors={errors}
                            defaultValue={company.description}
                            name="description"
                            multiline
                            rows={6}
                            placeholder={formatMessage({ id: "stepForm.description" })}
                            control={control}
                            fullWidth
                          />
                        </Flex>
                        <Flex xs="100%" lg="50%">
                          <FormInput
                            error={errors.detailedDescription}
                            defaultValue={company.detailedDescription}
                            errors={errors}
                            name="detailedDescription"
                            multiline
                            rows={6}
                            placeholder={formatMessage({ id: "stepForm.DetailDescription" })}
                            control={control}
                            fullWidth
                          />
                        </Flex>
                        <Flex xs="100%" lg="50%">
                          <FormInput
                            error={errors.goal}
                            defaultValue={company.goal}
                            errors={errors}
                            name="goal"
                            label={formatMessage({ id: "stepForm.companyGoal" })}
                            control={control}
                            fullWidth
                          />
                        </Flex>
                        <Flex xs="100%" lg="50%">
                          <FormInput
                            error={errors.targetPlatform}
                            defaultValue={company.targetPlatform}
                            errors={errors}
                            name="targetPlatform"
                            placeholder={formatMessage({ id: "stepForm.landingPage" })}
                            control={control}
                            fullWidth
                          />
                        </Flex>
                        <Flex xs="100%">
                          <FormInput
                            error={errors.budget}
                            errors={errors}
                            name="budget"
                            label={formatMessage({ id: "stepForm.materials" })}
                            control={control}
                            fullWidth
                          />
                        </Flex>
                        <Flex xs="100%">
                          <div className={classes.creativesLabel}>{formatMessage({ id: "stepForm.creativesExamples" })}</div>
                          <Flex container spacing={10} marginBottom>
                            {creatives.map((item, index) => <Flex>
                              <FileBox
                                id="creative"
                                hasFile
                                content={item}
                                handler={() => setCreatives(prev => {
                                  const proxy = [...prev];
                                  proxy.splice(index, 1);
                                  return proxy;
                                })}
                              />
                            </Flex>)}
                            <Flex>
                              <FileBox
                                id="creative"
                                content={formatMessage({ id: "action.add" })}
                                hasFile={false}
                                handler={(res) => setCreatives(prev => [...prev, res.headers.location])}
                              />
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                </div>
              </StepContent>
              <StepContent currentStep={activeStep} index={4}>
                <div className={classes.stepWrap}>
                  <div className={classes.stepInner}>
                    <div className={classes.stepInputWrap} style={{ display: "flex", justifyContent: "center" }}>
                      <Flex container spacing={20} column style={{ flexGrow: 0 }}>
                        <Flex>
                          <Controller
                            error
                            defaultValue={company.hiddenCampaign}
                            render={props => <Switcher error={errors.hiddenCampaign} checked={props.value} onChange={(e, val) => props.onChange(val)} />}
                            name="hiddenCampaign"
                            control={control}
                          />
                          <span>
                      {formatMessage({ id: 'stepForm.closedCompany' })}
                    </span>
                        </Flex>
                        <Flex>
                          <Controller
                            error
                            defaultValue={company.detailsOnlyForApprovedBloggers}
                            render={props => <Switcher error={errors.detailsOnlyForApprovedBloggers} checked={props.value} onChange={(e, val) => props.onChange(val)} />}
                            name="detailsOnlyForApprovedBloggers"
                            control={control}
                          />
                          <span>
                      {formatMessage({ id: 'stepForm.approvedBloggers' })}
                    </span>
                        </Flex>
                        <Flex>
                          <Controller
                            error
                            defaultValue={company.publishRightAfterModeration}
                            render={props => <Switcher error={errors.publishRightAfterModeration} checked={props.value} onChange={(e, val) => props.onChange(val)} />}
                            name="publishRightAfterModeration"
                            control={control}
                          />
                          <span>
                      {formatMessage({ id: 'stepForm.publishImmediately' })}
                    </span>
                        </Flex>
                        {!publishRightAfterModeration && (
                          <Flex>
                            <div className={classes.inputTitle}>
                              {formatMessage({ id: 'stepForm.schedulePublication' })}
                            </div>
                            <div className={classes.inputSubtitle}>
                              {formatMessage({ id: 'stepForm.publicationDate' })}
                            </div>
                            <FormDatepicker
                              error={errors.publishDate}
                              errors={errors}
                              control={control}
                              defaultValue={company.publishDate}
                              name="publishDate"
                              dateFormat="dd.MM.yyyy HH:mm"
                              pickerProps={{
                                showTimeInput: true,
                              }}
                              textFiledProps={{
                                label: formatMessage({ id: "stepForm.publication"})
                              }}
                            />
                          </Flex>
                        )}
                      </Flex>
                    </div>
                  </div>
                </div>
              </StepContent>
              <Flex container spacing={20} marginBottom={!md} center="xs" style={{ marginTop: 20 }}>
                {activeStep > 0 && (
                  <Flex xs="100%" lg="auto">
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth={!md}
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      {formatMessage({ id: "stepForm.back" })}
                    </Button>
                  </Flex>
                )}
                <Flex xs="100%" lg="auto" order={md ? "initial" : "-1"}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth={!md}
                    type={activeStep === steps.length - 1 ? "submit" : "button"}
                    onClick={onNextClick}
                  >
                    {formatMessage({ id: activeStep === steps.length - 1 ? `${companyId ? "action.edit" : "stepForm.create"}` : "stepForm.next" })}
                  </Button>
                </Flex>
                {!md && (
                  <Flex xs="100%">
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth={!md}
                      onClick={() => setIsConfirmOpen(true)}
                    >Отмена</Button>
                  </Flex>
                )}
              </Flex>
            </form>
          )
      }
    </div>
  )
}

export default CompanyNew;