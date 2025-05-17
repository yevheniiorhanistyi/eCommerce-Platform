import { Address, CustomerDraft } from '@commercetools/platform-sdk';
import { RegisterFormFields, UserAddress } from './types';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

const mapFormData = (formData: RegisterFormFields): CustomerDraft => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    billingAddress,
    shippingAddress
  } = formData;

  const useSame = shippingAddress.useSame === true;

  const mappedBillingAddress = mapAddress(billingAddress);
  const mappedShippingAddress = useSame ? mappedBillingAddress : mapAddress(shippingAddress);

  const addresses: Address[] = useSame
    ? [mappedBillingAddress]
    : [mappedBillingAddress, mappedShippingAddress];

  return {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    customerNumber: phoneNumber, //temporary used for Phone number storage
    addresses,
    defaultBillingAddress: 0,
    defaultShippingAddress: useSame ? 0 : 1,
    billingAddresses: [0],
    shippingAddresses: [useSame ? 0 : 1]
  };
};

function mapAddress(address: UserAddress): Address {
  const { useSame, ...rest } = address;
  void useSame;
  const countryCode = countries.getAlpha2Code(address.country, 'en');

  if (!countryCode) {
    throw new Error(`Invalid country name: ${address.country}`);
  }

  return {
    ...rest,
    country: countryCode
  };
}

export default mapFormData;
