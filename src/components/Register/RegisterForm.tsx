'use client';

import { Form, Formik, FormikProps, ErrorMessage } from 'formik';

import { defineStepper } from '@/components/ui/stepper';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { registerStep0Schema, registerStep1Schema } from './RegisterSchema';


type RegisterFormProps = Pick<
  FormikProps<RegisterFormFields>,
  'values' | 'errors' | 'touched' | 'handleChange' | 'handleBlur'
> & { setFieldValue: (field: string, value: unknown) => void };

type Address = {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  useSame?: boolean;
};

type RegisterFormFields = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  billingAddress: Address;
  shippingAddress: Address;
};

const RegisterForm = (): JSX.Element => {
  const steps = [
    { id: '0', title: 'Email & password', validation: registerStep0Schema },
    { id: '1', title: 'Personal info', validation: registerStep1Schema }
  ];

  const { Stepper } = defineStepper(...steps);

  const initialValues: RegisterFormFields = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    billingAddress: {
        country: '',
        city: '',
        street: '',
        postalCode: ''
      },
    shippingAddress: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
        useSame: true,
    },
  };

  return (
    <Card className="flex items-center justify-center p-5 sm:px-[50px] sm:py-[35px] max-w-[502px] w-full shadow-lg rounded-x1">
      <CardHeader className="gap-0 px-0 w-full">
        <CardTitle className="text-2xl font-bold text-center ">Create Your Account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 px-0 w-full">
        <Stepper.Provider>
          {({ methods }) => (
            <Formik
              initialValues={initialValues}
              validationSchema={methods.current.validation}
              onSubmit={(values) => {
                console.log('Registration values:', values);

              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched,  validateForm, submitForm, isValid, dirty }) => (
                <Form className="flex justify-self-center flex-col gap-7 max-w-[400px] w-full">
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
                    '0': (Step) => (
                      <AccountStep
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    ),
                    '1': (Step) => (
                      <PersonalInfoStep 
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    )
                  })}

                  <Stepper.Controls className="flex justify-end">
                    <Button
                      className="cursor-pointer min-w-[90px]"
                      type="button"
                      variant={methods.isFirst ? 'ghost' : 'default'}
                      onClick={() => methods.prev()}
                      disabled={methods.isFirst}
                    >
                      {methods.isFirst ? '' : 'Previous'}
                    </Button>
                    <Button
                      className="cursor-pointer min-w-[90px]"
                      type="button"
                      disabled={!isValid || !dirty}
                      onClick={async (e) => {
                        const isValid = await validateForm();
                        if (Object.keys(isValid).length === 0) {
                          methods.isFirst ? methods.next() : submitForm();
                        } else {
                          markFieldsTouched(isValid, setFieldTouched);
                        }
                      }}
                    >
                      {methods.isFirst ? 'Next' : 'Register'}
                    </Button>
                  </Stepper.Controls>
                </Form>
              )}
                
            </Formik>
          )}
        </Stepper.Provider>
        <div className="text-center text-sm">
          <span>Already have an account? </span>
          <a
            href="/login"
            className="underline underline-offset-4 text-black hover:text-neutral-600 transition-colors font-bold"
          >
            Sign In.
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

function AccountStep({
  values,
  errors,
  touched,
  handleChange,
  handleBlur
}: RegisterFormProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div className="relative">
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
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.email && touched.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name="email"
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="relative">
        <label htmlFor="password" className="mb-1 font-medium text-sm md:text-base">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.password && touched.password
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black',
            'pr-10'
          )}
        />
        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute bottom-0 right-0 hover:cursor-pointer"
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </Button>
        <div className="text-[12px]/[14px]/[14px] text-red-600 absolute">
          <ErrorMessage
            name="password"
            render={(msg) => <div className="text-red-600 text-">{msg}</div>}
          />
        </div>
      </div>
      <div className="relative">
        <label htmlFor="confirmPassword" className="mb-1 font-medium text-sm md:text-base">
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.confirmPassword && touched.confirmPassword
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black',
            'pr-10'
          )}
        />
        <Button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute bottom-0 right-0 hover:cursor-pointer"
        >
          {showConfirmPassword ? <Eye /> : <EyeOff />}
        </Button>
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name="confirmPassword"
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
    </>
  );
}

function PersonalInfoStep({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}: RegisterFormProps): JSX.Element {
  return (
    <>
      <div className="relative">
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
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.firstName && touched.firstName
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name="firstName"
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="relative">
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
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.lastName && touched.lastName
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name="lastName"
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="relative">
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
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.dateOfBirth && touched.dateOfBirth
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name="dateOfBirth"
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="relative">
        <label htmlFor="phoneNumber" className="mb-1 font-medium text-sm md:text-base">
          Phone number
        </label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            errors.phoneNumber && touched.phoneNumber
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name="phoneNumber"
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      {renderAddressFields(
        { values, errors, touched, handleChange, handleBlur, setFieldValue },
        'billingAddress'
      )}
      <div className="flex items-center justify-between">
        <label htmlFor="useSame" className="font-medium">
          Use same address for shipping
        </label>
        <Switch
          className='hover:cursor-pointer'
          id="useSame"
          name='useSame'
          checked={values.shippingAddress.useSame}
          onCheckedChange={(checked) => {
            console.log(checked);
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
  return (
    <fieldset className="flex gap-3.5 flex-wrap">
      <legend className="basis-full text-lg font-bold w-full border-b-2 border-b-black not-last:mb-2.5">
        {label === 'billingAddress' ? 'Billing Address' : 'Shipping Address'}
      </legend>
      <div className="sm:max-w-[190px] w-full relative">
        <label htmlFor={`${label}.country`} className="mb-1 font-medium text-sm md:text-base">
          Country
        </label>
        <Input
          id={`${label}.country`}
          name={`${label}.country`}
          placeholder="Enter your country"
          value={props.values[label]?.country}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            props.errors[label]?.country && props.touched[label]?.country
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name={`${label}.country`}
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="sm:max-w-[190px] w-full relative">
        <label htmlFor={`${label}.city`} className="mb-1 font-medium text-sm md:text-base">
          City
        </label>
        <Input
          id={`${label}.city`}
          name={`${label}.city`}
          placeholder="Enter your city"
          value={props.values[label]?.city}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            props.errors[label]?.city && props.touched[label]?.city
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name={`${label}.city`}
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="sm:max-w-[190px] w-full relative">
        <label htmlFor={`${label}.street`} className="mb-1 font-medium text-sm md:text-base">
          Street
        </label>
        <Input
          id={`${label}.street`}
          name={`${label}.street`}
          placeholder="Enter your street"
          value={props.values[label]?.street}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            props.errors[label]?.street && props.touched[label]?.street
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name={`${label}.street`}
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
      <div className="sm:max-w-[190px] w-full relative">
        <label htmlFor={`${label}.postalCode`} className="mb-1 font-medium text-sm md:text-base">
          Postal code
        </label>
        <Input
          id={`${label}.postalCode`}
          name={`${label}.postalCode`}
          placeholder="Enter your postal code"
          value={props.values[label]?.postalCode}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          className={cn(
            '!text-sm !placeholder:text-sm',
            props.errors[label]?.postalCode && props.touched[label]?.postalCode
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black'
          )}
        />
        <div className="text-[12px]/[14px] text-red-600">
          <ErrorMessage
            name={`${label}.postalCode`}
            render={(msg) => <div className="text-red-600 absolute">{msg}</div>}
          />
        </div>
      </div>
    </fieldset>
  );
}

function markFieldsTouched(errors: Record<string, unknown>, setFieldTouched: (field: string, touched: boolean) => void) {
  Object.entries(errors).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      Object.keys(value).forEach((nested) => {
        setFieldTouched(`${key}.${nested}`, true);
      });
    } else {
      setFieldTouched(key, true);
    }
  });
}

export default RegisterForm;
