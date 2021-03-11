import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Flex from "common/components/global/Flex";
import FormInput from "common/components/global/FormInput";
import { usePersonalBillReplenishment } from "./viewModel";

const PersonalBillReplenishment = () => {
  const vm = usePersonalBillReplenishment()
  const {
    handleSubmit,
    control,
    errors,
    formatMessage,
  } = vm

  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: 40 }}>
        {formatMessage({ id: "pages.personalBillReplenishment" })}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Flex container column spacing={20} marginBottom xs="100%" lg="50%">
          <Flex>
            <FormInput
              error={errors.amount}
              errors={errors}
              name="amount"
              label={<span>{formatMessage({ id: "personalBillReplenishmentPage.amount" })}<span style={{ color: "red" }}>*</span></span>}
              control={control}
              fullWidth
            />
          </Flex>
          <Flex>
            <FormInput
              error={errors.description}
              errors={errors}
              name="description"
              multiline
              rows={6}
              placeholder={formatMessage({ id: "personalBillReplenishmentPage.description" })}
              control={control}
              fullWidth
            />
          </Flex>

          <Flex>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
            >
              {formatMessage({ id: "personalBillReplenishmentPage.createPayment" })}
            </Button>
          </Flex>
        </Flex>
      </form>
    </div >
  )
}

export default PersonalBillReplenishment;
