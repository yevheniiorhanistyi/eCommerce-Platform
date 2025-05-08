'use client';

import { Form, Formik, FormikProps } from 'formik';

import { defineStepper } from '@/components/ui/stepper';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type RegisterFormProps = Pick<
  FormikProps<RegisterFormFields>,
  'values' | 'handleChange' | 'handleBlur'
> & { setFieldValue: (field: string, value: any) => void };

type Address = {
  country: string;
  city: string;
  street: string;
  postalCode: string;
};

type RegisterFormFields = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  address: Address;
  shippingAddress?: Address | null;
  useSame: boolean;
};

const { Stepper } = defineStepper(
  { id: 'step-0', title: 'Email & password' },
  { id: 'step-1', title: 'Personal information' }
);

const RegisterForm = (): JSX.Element => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);

  const initialValues: RegisterFormFields = {
    email: '',
    password: '',
    confirmPassword: '',

    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    address: {
      country: '',
      city: '',
      street: '',
      postalCode: ''
    },
    shippingAddress: null,
    useSame: true
  };

  return (
    <Card className="flex items-center justify-center p-5 sm:px-[50px] sm:py-[35px] max-w-[502px] w-full shadow-lg rounded-x1">
      <CardHeader className="gap-0 px-0 w-full">
        <CardTitle className="text-2xl font-bold text-center ">Create Your Account </CardTitle>
      </CardHeader>
      <CardContent className="px-0 w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log('Registration values:', values)}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Stepper.Provider>
              {({ methods }) => (
                <Form className="flex justify-self-center flex-col gap-3.5 max-w-[400px] w-full">
                  <Stepper.Navigation className="px-5">
                    {methods.all.map((step) => (
                      <Stepper.Step
                        key={step.id}
                        of={step.id}
                        className="cursor-default"
                      ></Stepper.Step>
                    ))}
                  </Stepper.Navigation>
                  {methods.switch({
                    'step-0': (step) => (
                      <AccountStep
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ),
                    'step-1': (step) => (
                      <PersonalInfoStep
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    )
                  })}
                  <Stepper.Controls className="flex justify-end mt-4">
                    <Button
                      className="cursor-pointer min-w-[90px]"
                      type="button"
                      variant={methods.isFirst ? 'secondary' : 'default'}
                      onClick={methods.prev}
                      disabled={methods.isFirst}
                    >
                      Previous
                    </Button>
                    <Button
                      className="cursor-pointer min-w-[90px]"
                      type={methods.isFirst ? 'button' : 'submit'}
                      onClick={methods.isLast? methods.reset : methods.next}
                    >
                      {methods.isFirst ? 'Next' : 'Register'}
                    </Button>
                  </Stepper.Controls>
                </Form>
              )}
            </Stepper.Provider>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

function AccountStep({ values, handleChange, handleBlur }: RegisterFormProps): JSX.Element {
  return (
    <>
      <div>
        <label htmlFor="email" className="mb-1 font-medium text-sm md:text-base">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 font-medium text-sm md:text-base">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-1 font-medium text-sm md:text-base">
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
}

function PersonalInfoStep({
  values,
  handleChange,
  handleBlur,
  setFieldValue
}: RegisterFormProps): JSX.Element {
  return (
    <>
      <div>
        <label htmlFor="firstName" className="mb-1 font-medium text-sm md:text-base">
          First name
        </label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter your name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <label htmlFor="lastName" className="mb-1 font-medium text-sm md:text-base">
          Last name
        </label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter your family name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="mb-1 font-medium text-sm md:text-base">
          Date of birth
        </label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          placeholder="Enter your date of birth"
          value={values.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          className="placeholder:flex justify-between"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 font-medium text-sm md:text-base">
          Phone number
        </label>
        <Input
          id="phone"
          name="phone"
          placeholder="Enter your phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {renderAddressFields({ values, handleChange, handleBlur, setFieldValue }, 'address')}
      <div className="flex items-center justify-between">
        <label htmlFor="useSame" className="font-medium">
          Use same address for shipping
        </label>
        <Switch
          id="useSame"
          checked={values.useSame}
          onCheckedChange={(checked) => setFieldValue('useSame', checked)}
        />
      </div>
      {!values.useSame && (
        <>
          {renderAddressFields(
            { values, handleChange, handleBlur, setFieldValue },
            'shippingAddress'
          )}
        </>
      )}
    </>
  );
}

function renderAddressFields(
  data: RegisterFormProps,
  label: 'address' | 'shippingAddress'
): JSX.Element {
  return (
    <fieldset className="flex gap-3.5 flex-wrap">
      <legend className="basis-full text-lg font-bold w-full border-b-2 border-b-black not-last:mb-2.5">
        {label === 'address' ? 'Billing Address' : 'Shipping Address'}
      </legend>
      <div className="sm:max-w-[190px] w-full">
        <label htmlFor={`${label}.country`} className="mb-1 font-medium text-sm md:text-base">
          Country
        </label>
        <Input
          id={`${label}.country`}
          name={`${label}.country`}
          placeholder="Enter your country"
          value={data.values[label]?.country}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
        />
      </div>
      <div className="sm:max-w-[190px] w-full">
        <label htmlFor={`${label}.city`} className="mb-1 font-medium text-sm md:text-base">
          City
        </label>
        <Input
          id={`${label}.city`}
          name={`${label}.city`}
          placeholder="Enter your city"
          value={data.values[label]?.city}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
        />
      </div>
      <div className="sm:max-w-[190px] w-full">
        <label htmlFor={`${label}.street`} className="mb-1 font-medium text-sm md:text-base">
          Street
        </label>
        <Input
          id={`${label}.street`}
          name={`${label}.street`}
          placeholder="Enter your street"
          value={data.values[label]?.street}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
        />
      </div>
      <div className="sm:max-w-[190px] w-full">
        <label htmlFor={`${label}.postalCode`} className="mb-1 font-medium text-sm md:text-base">
          Postal code
        </label>
        <Input
          id={`${label}.postalCode`}
          name={`${label}.postalCode`}
          placeholder="Enter your postal code"
          value={data.values[label]?.postalCode}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
        />
      </div>
    </fieldset>
  );
}

export default RegisterForm;