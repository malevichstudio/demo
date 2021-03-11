import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import useIntl from "react-intl/lib/src/components/useIntl";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { toast } from "react-toastify";
import Flex from "../../components/global/Flex";
import ChangeImage from "../../components/icons/ChangeImage";
import useStyles from "./styles";
import logo from "../../../assets/images/avatar.png";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { find } from "lodash";
import FormInput from "../../components/global/FormInput";
import Button from "@material-ui/core/Button";
import Loader from "../../components/global/Loader";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisiblePass from "../../components/icons/VisiblePass";
import InvisiblePass from "../../components/icons/InvisiblePass";
import Http from '../../../http';
import format from '../../helpers/DateHelper';
import FileLoader from "../../components/global/FileLoader";
import { getMe } from "../../../store/actions/me";
import LSHelper from "../../helpers/LocalStorageHelper";
import { getParameterByName } from "../../helpers/getParamsHelper";
import AddFile from "../../components/icons/AddFile";
import Instagram from "../../components/icons/Instagram";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { getBloggerInstagram } from "../../../store/actions/bloggerAccount";
import { platforms } from "../../constants/platforms";
import { useHistory } from "react-router-dom";


const UserProfile = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const me = useSelector(state => state.me.data);
  const isAuth = useSelector(state => state.auth.isAuth);
  const role = useSelector(state => state.auth.role);
  const loading = useSelector(state => state.me.loading);
  const instagramUserName = find(me.socialNetworks, ["socialNetworkId", platforms[0].id])?.userName
  const socials = useSelector(state => state.bloggerAccount.data);
  const classes = useStyles({ filed: Boolean(instagramUserName) });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);
  const [oldVisibility, setOldVisibility] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const code = getParameterByName("code");
  const { push } = useHistory();

  useEffect(() => {
    setLogoLoading(true)
    if (code && isAuth) {
      Http.get(`/integration/v1/instagram/link/${code}`, {
        params: {
          redirectUri: "https://staging.blogyou.ru/app/profile",
        }
      })
        .finally(() => push("/app/profile"));
    } else {
      dispatch(getMe());
      setLogoLoading(false);
    }
  }, [isAuth, socials])

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email(formatMessage({ id: 'inputErrors.email' })).required(formatMessage({ id: 'inputErrors.required' })),
    firstName: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
    secondName: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),

  });

  const PasswordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
    newPassword: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
    confirmNewPassword: Yup.string().test('passwords-match', formatMessage({ id: 'inputErrors.password.match' }), function (value) {
      return this.parent.newPassword === value;
    }),
  });

  const { handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const { handleSubmit: resetPassword, control: resetControl, errors: resetErrors } = useForm({
    resolver: yupResolver(PasswordValidationSchema),
  });

  const onResetPassword = ({
    oldPassword,
    newPassword,
  }) => {
    Http.put(`/auth/v1/restore`, {
      oldPassword,
      newPassword,
    })
      .then(() => {
        toast.success(formatMessage({ id: "reset-password.message" }))
        setIsPasswordEdit(false);
      })
      .catch(error => {
        console.log(error.response.data.description)
        toast.error(error.response.data.description);
        setIsPasswordEdit(false);
      });
  }

  const editProfileSubmit = ({
    firstName,
    secondName,
    ...rest
  }) => {
    Http.put(`/ident/v1/${role === "Blogger" ? "blogger" : "advuser"}/${me.id}`, {
      fio: {
        firstName,
        secondName,
      },
      ...rest,
    })
      .then(res => {
        dispatch(getMe());
        setIsEdit(false);
      })
      .catch(errors => {
        setIsEdit(false);
      });
  }

  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: 40 }}>
        {formatMessage({ id: "pages.profile" })}
      </Typography>
      {
        loading
          ? <Loader />
          : (
            <Flex container spacing={20} middle={!md ? "xs" : undefined} marginBottom nowrap column={!md}>
              <Flex>
                <div className={classes.avatarWrap}>
                  <div className={classes.avatar}>
                    {
                      logoLoading
                        ? <Loader local />
                        : <img src={me?.pathToPhoto?.uri || logo} alt="avatar" />
                    }
                    <FileLoader
                      id="ava"
                      setLoading={() => setLogoLoading(true)}
                      onSuccess={(res) => {
                        Http.put(`/ident/v1/${role === "Blogger" ? "blogger" : "advuser"}/${me.id}`, {
                          pathToPhoto: {
                            uri: res.headers.location,
                          },
                        })
                          .then(() => {
                            dispatch(getMe());
                            setLogoLoading(false);
                          })
                          .catch(errors => {
                            setLogoLoading(false);
                            console.log(errors)
                          });
                      }}
                    >
                      <div className={classes.avatarChanger}>
                        <ChangeImage />
                        {formatMessage({ id: "avatar.change" })}
                      </div>
                    </FileLoader>
                  </div>
                </div>
              </Flex>
              <Flex container spacing={20} column={!lg}>
                <Flex xs="100%" lg="400px" xl="50%">
                  <form onSubmit={handleSubmit(editProfileSubmit)}>
                    <Flex container spacing={15} marginBottom>
                      <Flex xs="100%">
                        <FormInput
                          error={errors.secondName}
                          errors={errors}
                          readOnly={true}
                          defaultValue={me.fio?.secondName}
                          name="secondName"
                          disabled={!isEdit}
                          label={formatMessage({ id: "secondName.name" })}
                          control={control}
                          fullWidth
                          InputProps={{
                            readOnly: !isEdit,
                          }}
                        />
                      </Flex>
                      <Flex xs="100%">
                        <FormInput
                          error={errors.firstName}
                          defaultValue={me.fio?.firstName}
                          errors={errors}
                          readOnly={true}
                          name="firstName"
                          disabled={!isEdit}
                          label={formatMessage({ id: "firstName.name" })}
                          control={control}
                          fullWidth
                          InputProps={{
                            readOnly: !isEdit,
                          }}
                        />
                      </Flex>
                      <Flex xs="100%">
                        <FormInput
                          error={errors.phone}
                          defaultValue={me.phone}
                          errors={errors}
                          readOnly={true}
                          name="phone"
                          disabled={!isEdit}
                          label={formatMessage({ id: "phone.name" })}
                          control={control}
                          fullWidth
                          InputProps={{
                            readOnly: !isEdit,
                          }}
                        />
                      </Flex>
                      <Flex xs="100%">
                        <FormInput
                          error={errors.email}
                          defaultValue={me.email}
                          errors={errors}
                          disabled={!isEdit}
                          readOnly={true}
                          name="email"
                          label="E-mail"
                          control={control}
                          fullWidth
                          InputProps={{
                            readOnly: !isEdit,
                          }}
                        />
                      </Flex>
                      {!isEdit && (
                        <Flex xs="100%">
                          <Button disabled={isPasswordEdit} onClick={() => setIsEdit(true)} variant="contained" color="secondary">
                            {formatMessage({ id: "action.edit" })}
                          </Button>
                        </Flex>
                      )}
                      {isEdit && (
                        <Flex container spacing={20}>
                          <Flex>
                            <Button onClick={() => {
                              setIsEdit(false);
                              reset();
                            }} color="secondary" variant="outlined">
                              {formatMessage({ id: "action.cancel" })}
                            </Button>
                          </Flex>
                          <Flex>
                            <Button
                              type="submit"
                              color="secondary"
                              variant="contained"
                            >
                              {formatMessage({ id: "action.save" })}
                            </Button>
                          </Flex>
                        </Flex>
                      )}
                    </Flex>
                  </form>
                </Flex>
                <Flex xs="100%" lg="400px" xl="50%">
                  {!isPasswordEdit && (
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={isEdit}
                      onClick={() => setIsPasswordEdit(true)}
                    >
                      {formatMessage({ id: "action.changePassword" })}
                    </Button>
                  )}
                  {isPasswordEdit && (
                    <form onSubmit={resetPassword(onResetPassword)}>
                      <Flex container spacing={15} marginBottom>
                        <Flex xs="100%">
                          <FormInput
                            error={resetErrors.oldPassword}
                            errors={resetErrors}
                            name="oldPassword"
                            type={oldVisibility ? "text" : "password"}
                            label={formatMessage({ id: 'password.old.name' })}
                            control={resetControl}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setOldVisibility(!oldVisibility)}
                                  >
                                    {oldVisibility ? <VisiblePass /> : <InvisiblePass />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Flex>
                        <Flex xs="100%">
                          <FormInput
                            error={resetErrors.newPassword}
                            errors={resetErrors}
                            name="newPassword"
                            type={passwordVisibility ? "text" : "password"}
                            label={formatMessage({ id: 'password.name' })}
                            control={resetControl}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                  >
                                    {passwordVisibility ? <VisiblePass /> : <InvisiblePass />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Flex>
                        <Flex xs="100%">
                          <FormInput
                            error={resetErrors.confirmNewPassword}
                            errors={resetErrors}
                            name="confirmNewPassword"
                            type={confirmVisibility ? "text" : "password"}
                            label={formatMessage({ id: 'password.confirm.name' })}
                            control={resetControl}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setConfirmVisibility(!confirmVisibility)}
                                  >
                                    {confirmVisibility ? <VisiblePass /> : <InvisiblePass />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Flex>
                        <Flex container spacing={20}>
                          <Flex>
                            <Button
                              color="secondary"
                              variant="outlined"
                              onClick={() => {
                                setIsPasswordEdit(false);
                                reset();
                              }}
                            >
                              {formatMessage({ id: "action.cancel" })}
                            </Button>
                          </Flex>
                          <Flex>
                            <Button type="submit" color="secondary" variant="contained">
                              {formatMessage({ id: "action.save" })}
                            </Button>
                          </Flex>
                        </Flex>
                      </Flex>
                    </form>
                  )}
                  {role === "Blogger" && (
                    <>

                      <div className={classes.title}>
                        {formatMessage({ id: "userProfile.accounts" })}
                      </div>
                      <div className={classes.accTitle}>
                        Instagram
                      </div>
                      <div className={classes.platformBox}>
                        {
                          Boolean(instagramUserName)
                            ? <NavLink to={routes.inst}>
                              <Flex flex middle="xs">
                                <Instagram style={{ marginRight: 5 }} /> {instagramUserName}
                              </Flex>
                            </NavLink>
                            : formatMessage({ id: "userProfile.addAccount" })
                        }
                        <div onClick={() => {
                          if (Boolean(instagramUserName)) {
                            Http.delete("/integration/v1/instagram/unlink")
                              .then(() => {
                                dispatch(getMe())
                              })
                          } else {
                            Http.get("/integration/v1/instagram/authcode", {
                              params: {
                                redirectUri: "https://staging.blogyou.ru/app/profile",
                              }
                            })
                              .then(res => window.open(res.data.data))
                          }
                        }} className={classes.platformHandler}>
                          <AddFile />
                        </div>
                      </div>
                    </>
                  )}
                </Flex>
              </Flex>
            </Flex>
          )
      }
    </div >
  )
}

export default UserProfile;