import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import useIntl from "react-intl/lib/src/components/useIntl";


export const usePersonalBillReplenishment = () => {
  const { formatMessage } = useIntl();

  const ValidationSchema = Yup.object().shape({
    amount: Yup.number().typeError(formatMessage({ id: 'inputErrors.type.number' })).required(formatMessage({ id: 'inputErrors.required' })),
  });

  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (formData) => {
    const data = {
      amount: {
        value: formData.amount,
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: "https://clients.blogyou.ru/app/personal-bill"
      },
      description: formData.description
    }
    console.log({formData})
    console.log({data}) //TODO: add request to server 
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    formatMessage,
  }
}
