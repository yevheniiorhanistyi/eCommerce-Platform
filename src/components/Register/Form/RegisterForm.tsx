'use client';

import { Form, Formik } from 'formik';

import { defineStepper } from '@/components/ui/stepper';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { registerStep0Schema, registerStep1Schema } from '../RegisterSchema';
import { RegisterFormFields } from '../types';
import AccountStep from './AccountStep';
import PersonalInfoStep from './PersonalInfoStep';

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
      useSame: true
    }
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
              onSubmit={(values, { resetForm }) => {
                console.log('Registration values:', values);
                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                setFieldTouched,
                validateForm,
                submitForm,
                isValid,
                dirty
              }) => (
                <Form className="flex justify-self-center flex-col gap-4 max-w-[400px] w-full">
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
        <LoginButton />
      </CardContent>
    </Card>
  );
};

const LoginButton = (): JSX.Element => {
  return (
    <div className="text-center text-sm">
      <span>Already have an account? </span>
      <Link
        href="/login"
        className="underline underline-offset-4 text-black hover:text-neutral-600 transition-colors font-bold"
      >
        Sign In.
      </Link>
    </div>
  );
};

export function markFieldsTouched(
  errors: Record<string, unknown>,
  setFieldTouched: (field: string, touched: boolean) => void
) {
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
