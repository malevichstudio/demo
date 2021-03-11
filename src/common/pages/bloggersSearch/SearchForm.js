import React, {useEffect, useState} from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Flex from "../../components/global/Flex";
import FormSelect from "../../components/global/FormSelect";
import { paymentModels } from "../../constants/paymentModels"
import BaseAutocomplete from "../../components/global/BaseAutocomplite";
import Http from "../../../http";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { engagementRate } from "../../constants/engagementRate";
import { bloggersRating } from "../../constants/bloggersRating";
import FormInput from "../../components/global/FormInput";
import useStyles from "./styles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const SearchForm = ({ onSubmit }) => {
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const ValidationSchema = Yup.object().shape({
    creativePriceFrom: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })).transform((value, originalValue) => originalValue.trim() === "" ? null: value),
    creativePriceTo: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })).transform((value, originalValue) => originalValue.trim() === "" ? null: value),
    subscribersCountFrom: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })).transform((value, originalValue) => originalValue.trim() === "" ? null: value),
    subscribersCountTo: Yup.number().nullable(true).typeError(formatMessage({ id: 'inputErrors.type.number' })).transform((value, originalValue) => originalValue.trim() === "" ? null: value),
  });
  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(ValidationSchema),
  });
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState([]);
  useDebouncedEffect(() => {
    Http.get("/enums/v1/account-category/search", {
      params: {
        name: search
      },
    })
      .then((res) => {
        setCategories(res.data.data);
      });
  }, 500, [search])
  return (
    <form style={{ marginTop: 30 }} onSubmit={handleSubmit(onSubmit)}>
      <Flex container spacing={md ? 20 : 10} marginBottom>
        <Flex lg="33.333%" xs="100%">
          <div className={classes.inputTitle}>
            {formatMessage({ id: "searchForm.price" })}
          </div>
          <Flex container spacing={md ? 20 : 10}>
            <Flex xs="50%">
              <FormInput
                error={errors.creativePriceFrom}
                errors={errors}
                name="creativePriceFrom"
                label={formatMessage({ id: "searchForm.price.from" })}
                control={control}
                fullWidth
              />
            </Flex>
            <Flex xs="50%">
              <FormInput
                error={errors.creativePriceTo}
                errors={errors}
                name="creativePriceTo"
                label={formatMessage({ id: "searchForm.price.to" })}
                control={control}
                fullWidth
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex lg="33.333%" xs="100%">
          <div className={classes.inputTitle}>
            {formatMessage({ id: "searchForm.subscribersCount" })}
          </div>
          <Flex container spacing={md ? 20 : 10}>
            <Flex xs="50%">
              <FormInput
                error={errors.subscribersCountFrom}
                errors={errors}
                defaultValue={undefined}
                name="subscribersCountFrom"
                label={formatMessage({ id: "searchForm.subscribersCount.from" })}
                control={control}
                fullWidth
              />
            </Flex>
            <Flex xs="50%">
              <FormInput
                error={errors.subscribersCountTo}
                errors={errors}
                defaultValue={undefined}
                name="subscribersCountTo"
                label={formatMessage({ id: "searchForm.subscribersCount.to" })}
                control={control}
                fullWidth
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex lg="33.333%" xs="100%">
          <div className={classes.inputTitle}>
            {formatMessage({ id: "searchForm.rating" })}
          </div>
          <Flex container spacing={md ? 20 : 10}>
            <Flex xs="50%">
              <FormInput
                error={errors.subscribersCountFrom}
                errors={errors}
                defaultValue={undefined}
                name="ratingCountFrom"
                label={formatMessage({ id: "searchForm.rating.from" })}
                control={control}
                fullWidth
              />
            </Flex>
            <Flex xs="50%">
              <FormInput
                error={errors.subscribersCountTo}
                errors={errors}
                defaultValue={undefined}
                name="ratingCountTo"
                label={formatMessage({ id: "searchForm.rating.to" })}
                control={control}
                fullWidth
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex lg="33.3333%" xs="100%">
          <Controller
            name="interests"
            control={control}
            render={(props) => (
              <BaseAutocomplete
                multiple
                value={props.value}
                onChange={(e, val) => props.onChange(val)}
                options={categories}
                inputValue={search}
                label={formatMessage({ id: "searchForm.category" })}
                getOptionSelected={(option, val) => {
                  return option.id === val.id;
                }}
                onInputChange={(event, value) => {
                  setSearch(value)
                }}
                getOptionLabel={(option) => option.description}
              />
            )}
          />
        </Flex>
        <Flex lg="33.3333%" xs="100%">
          <FormSelect
            options={paymentModels}
            name="paymentModel"
            fullWidth
            isIntl
            label={formatMessage({ id: "searchForm.activity" })}
            control={control}
            error={errors.paymentModel}
            errors={errors}
          />
        </Flex>
        <Flex lg="33.3333%" xs="100%">
          <FormSelect
            options={engagementRate}
            name="engagementRate"
            fullWidth
            isIntl
            label={formatMessage({ id: "searchForm.engagementIndex" })}
            control={control}
            error={errors.engagementRate}
            errors={errors}
          />
        </Flex>
        <Flex lg="33.3333%" xs="100%">
          <FormSelect
            options={[{ label: "Instagram", value: "ed2d6b05-8b13-46c5-b755-43081aee72c9" }]}
            name="socialNetwork"
            fullWidth
            isIntl
            label={formatMessage({ id: "searchForm.platform" })}
            control={control}
            error={errors.socialNetwork}
            errors={errors}
          />
        </Flex>
        <Flex lg="33.3333%" xs="100%">
          <Button fullWidth variant="contained" color="primary" type="submit">
            {formatMessage({ id: "action.find" })}
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default SearchForm;