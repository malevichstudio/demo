import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import Flex from "../../components/global/Flex";
import useStyles from "./styles";
import FormInput from "../../components/global/FormInput";
import {paymentModels} from "../../constants/paymentModels";
import FormSelect from "../../components/global/FormSelect";
import FileBox from "../../components/global/FileBox";
import Http from "../../../http";
import {getMe} from "../../../store/actions/me";
import FileIcon from "../../components/icons/FileIcon";
import Loader from "../../components/global/Loader";
import Button from "@material-ui/core/Button";
import {organisationTypes} from "../../constants/organisationTypes";

const Organisation = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const me = useSelector(state => state.me.data);
  const role = useSelector(state => state.auth.role);
  const accountId = useSelector(state => state.auth.accountId);
  const proxyUrl = role === "Advertiser" ? `advuser/${accountId}` : `blogger/${accountId}`;
  const loading = useSelector(state => state.me.loading);
  const [letterOfAttorney, setLetterOfAttorney] = useState();
  const [signature, setSignature] = useState(me?.signature?.id);
  const [isEdit, setIsEdit] = useState(false);
  const classes = useStyles()
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email(formatMessage({ id: 'inputErrors.email' })).required(formatMessage({ id: 'inputErrors.required' })),
    password: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
  });
  const { handleSubmit, control, errors, reset } = useForm({
  });
  const editOrganisation = (data) => {
    Http.put(`/ident/v1/${proxyUrl}`, {
      organization: {
        signature: {
          id: signature,
        },
        letterOfAttorney: {
          id: letterOfAttorney,
        },
        organizationName: data.organizationName,
        directorFio:{
          firstName: data.firstName,
          secondName: data.secondName,
          middleName: data.middleName,
        },
        lawStamp: {
          lawIdentity: data.lawIdentity,
          inn: data.organisationInn,
          legalEntityData: {
            kpp: data.organisationKpp,
            ogrn: data.organisationOgrn,
            legalAddress: data.organisationAddress,
          },
        },
        bankData: {
          bankName: data.bankName,
          settlementAccount: data.settlementAccount,
          correspondentAccount: data.correspondentAccount,
          bik: data.bik,
          lawStamp: {
            inn: data.bankInn,
            legalEntityData: {
              kpp: data.bankKpp,
            },
          },
        },
      }
    }).then(() => {
      dispatch(getMe());
      setIsEdit(false);
    })
  };
  const fileUploadHandler = (res, filename, file, localHandler) => {
    if(file){
      localHandler(null)
      Http.put(`/ident/v1/${proxyUrl}`, {
        organization: {
          ...me.organization,
          [filename]: null,
        }
      }).then(() => dispatch(getMe()))
    } else {
      localHandler(res);
      Http.put(`/ident/v1/${proxyUrl}`, {
        organization: {
          ...me.organization,
          [filename]: {
            id: res.data,
          }
        }
      }).then(() => dispatch(getMe()))
    }
  };
  useEffect(() => {
    setLetterOfAttorney(me?.organization?.letterOfAttorney?.id)
    setSignature(me?.organization?.signature?.id)
  }, [me])
  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: 40 }}>
        {formatMessage({ id: "pages.organisation" })}
      </Typography>
      {
        loading
        ? <Loader />
        : (
          <form onSubmit={handleSubmit(editOrganisation)}>
            <Flex container spacing={20} marginBottom>
              <Flex md="50%" xs="100%">
                <Flex container column spacing={20} marginBottom>
                  <Flex>
                    <div className={classes.groupTitle}>{formatMessage({ id: "organisationData.commonInfo" })}</div>
                  </Flex>
                  <Flex>
                    <FormSelect
                      options={organisationTypes}
                      name="lawIdentity"
                      fullWidth
                      defaultValue={me?.organization?.lawStamp?.lawIdentity}
                      isIntl
                      label={formatMessage({ id: "organisationType.name" })}
                      control={control}
                      error={errors.lawIdentity}
                      errors={errors}
                      disabled={!isEdit}
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.organisationName}
                      defaultValue={me?.organization?.organizationName}
                      errors={errors}
                      disabled={!isEdit}
                      name="organizationName"
                      label={formatMessage({ id: "organisationName.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.organisationInn}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.lawStamp?.inn}
                      name="organisationInn"
                      label={formatMessage({ id: "inn.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.organisationKpp}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.lawStamp?.legalEntityData?.kpp}
                      name="organisationKpp"
                      label={formatMessage({ id: "kpp.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.organisationOgrn}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.lawStamp?.legalEntityData?.ogrn}
                      name="organisationOgrn"
                      label={formatMessage({ id: "ogrn.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.organisationAddress}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.lawStamp?.legalEntityData?.legalAddress}
                      name="organisationAddress"
                      label={formatMessage({ id: "lawAddress.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex md="50%" xs="100%">
                <Flex container column spacing={20} marginBottom>
                  <Flex>
                    <div className={classes.groupTitle}>
                      {formatMessage({ id: "organisationData.bankData" })}
                    </div>
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.settlementAccount}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.bankData?.settlementAccount}
                      name="settlementAccount"
                      label={formatMessage({ id: "billNumber.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.bankName}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.bankData?.bankName}
                      name="bankName"
                      label={formatMessage({ id: "recipientBank.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.bik}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.bankData?.bik}
                      name="bik"
                      label={formatMessage({ id: "bik.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.correspondentAccount}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.bankData?.correspondentAccount}
                      name="correspondentAccount"
                      label={formatMessage({ id: "correspondentBill.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.bankInn}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.bankData?.lawStamp?.inn}
                      name="bankInn"
                      label={formatMessage({ id: "inn.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.bankKpp}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.bankData?.lawStamp?.legalEntityData?.kpp}
                      name="bankKpp"
                      label={formatMessage({ id: "kpp.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex md="50%" xs="100%">
                <Flex container column spacing={20} marginBottom>
                  <div className={classes.groupTitle}>
                    {formatMessage({ id: "organisationData.fio" })}
                  </div>
                  <Flex>
                    <FormInput
                      error={errors.secondName}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.directorFio?.secondName}
                      name="secondName"
                      label={formatMessage({ id: "secondName.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.firstName}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.directorFio?.firstName}
                      name="firstName"
                      label={formatMessage({ id: "firstName.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                  <Flex>
                    <FormInput
                      error={errors.middleName}
                      errors={errors}
                      disabled={!isEdit}
                      defaultValue={me.organization?.directorFio?.middleName}
                      name="middleName"
                      label={formatMessage({ id: "middleName.name" })}
                      control={control}
                      fullWidth
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex md="50%" xs="100%">
                <Flex container column spacing={20} marginBottom>
                  <Flex>
                    <div className={classes.groupTitle}>
                      {formatMessage({ id: "attachAttorney.name" })}
                    </div>
                  </Flex>
                  <Flex>
                    <FileBox
                      id="letterOfAttorney"
                      secure
                      isSvg
                      hasFile={letterOfAttorney}
                      content={letterOfAttorney ? <FileIcon />  : formatMessage({ id: "action.upload" })}
                      handler={(res) => fileUploadHandler(res, "letterOfAttorney", letterOfAttorney, setLetterOfAttorney)}
                    />
                  </Flex>
                  <Flex>
                    <div className={classes.groupTitle}>
                      {formatMessage({ id: "uploadSignature.name" })}
                    </div>
                  </Flex>
                  <Flex>
                    <FileBox
                      id="signature"
                      secure
                      isSvg
                      hasFile={signature}
                      content={signature ? <FileIcon /> : formatMessage({ id: "action.attach" })}
                      handler={(res) => fileUploadHandler(res, "signature", signature, setSignature)}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex md="50%" xs="100%">
                <Flex container spacing={20} marginBottom>
                  {!isEdit && (
                    <Flex xs="100%">
                      <Button onClick={() => setIsEdit(true)} variant="contained" color="secondary">
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
              </Flex>
            </Flex>
          </form>
        )
      }
    </div>
  )
};

export default Organisation;