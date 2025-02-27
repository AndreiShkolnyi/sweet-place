import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner";
import { useSettings } from "./model/hooks/useSettings";
import { useUpdateSetting } from "./model/hooks/useUpdateSetting";

function UpdateSettingsForm() {
  const {
    data: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
    isLoading,
    error,
  } = useSettings();

  const { mutate: updateSetting, isLoading: isUpdating } = useUpdateSetting();

  const handleUpdate = (e) => {
    const { value, name } = e.target;
    if (!value || !name) return;
    updateSetting({ [name]: value });
  };
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          name='minBookingLength'
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          name='maxBookingLength'
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          name='maxGuestsPerBooking'
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          name='breakfastPrice'
          id='breakfast-price'
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
