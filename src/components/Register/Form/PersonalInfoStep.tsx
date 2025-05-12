import { Switch } from '@/components/ui/switch';
import { RegisterFormProps } from '../types';
import FormField from './FieldForm';
import { markFieldsTouched } from './RegisterForm';

function PersonalInfoStep(props: RegisterFormProps): JSX.Element {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = props;

  return (
    <>
      <FormField
        name="firstName"
        label="First Name"
        type="text"
        placeholder="Enter your name"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firstName}
        touched={touched.firstName}
      />
      <FormField
        name="lastName"
        label="Last Name"
        type="text"
        placeholder="Enter your last(family) name"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.lastName}
        touched={touched.lastName}
      />
      <FormField
        name="dateOfBirth"
        label="Date of Birth"
        type="text"
        placeholder="YYYY-MM-DD"
        value={values.dateOfBirth}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.dateOfBirth}
        touched={touched.dateOfBirth}
        withDatePicker
        onDatePick={(date) => setFieldValue('dateOfBirth', date)}
      />
      <FormField
        name="phoneNumber"
        label="Phone Number"
        type="text"
        placeholder="Enter your phone number"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phoneNumber}
        touched={touched.phoneNumber}
      />

      {renderAddressFields(
        { values, errors, touched, handleChange, handleBlur, setFieldValue },
        'billingAddress'
      )}
      <div className="flex items-center justify-between">
        <label htmlFor="useSame" className="font-medium">
          Use same address for shipping
        </label>
        <Switch
          className="hover:cursor-pointer"
          id="useSame"
          name="useSame"
          checked={values.shippingAddress.useSame}
          onCheckedChange={(checked) => {
            setFieldValue('shippingAddress.useSame', checked);
          }}
        />
      </div>
      {!values.shippingAddress.useSame && (
        <>
          {renderAddressFields(
            { values, errors, touched, handleChange, handleBlur, setFieldValue },
            'shippingAddress'
          )}
        </>
      )}
    </>
  );
}

function renderAddressFields(
  props: RegisterFormProps,
  label: 'billingAddress' | 'shippingAddress'
): JSX.Element {
  const { values, errors, touched, handleChange, handleBlur } = props;
  const addressFields = [
    { name: 'country', label: 'Country', placeholder: 'Enter your country' },
    { name: 'city', label: 'City', placeholder: 'Enter your city' },
    { name: 'streetName', label: 'Street', placeholder: 'Enter your street' },
    { name: 'postalCode', label: 'Postal code', placeholder: 'Enter your postal code' }
  ];
  return (
    <fieldset className="flex gap-7 flex-wrap">
      <legend className="basis-full text-[16px] font-bold w-full border-b-2 border-b-black not-last:mb-2.5">
        {label === 'billingAddress' ? 'Billing Address' : 'Shipping Address'}
      </legend>
      {addressFields.map((field) => {
        return (
          <FormField
            key={field.label}
            name={`${label}.${field.name}`}
            label={field.label}
            placeholder={field.placeholder}
            value={values[label]?.[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[label]?.[field.name]}
            touched={touched[label]?.[field.name]}
          />
        );
      })}
    </fieldset>
  );
}

export default PersonalInfoStep;
