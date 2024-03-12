import { CountryCode, getCountries, getPhoneCode } from "libphonenumber-js";
import CountryList from "react-select-country-list";

import { SelectOption } from "@/components/atoms/Select/Select";

export const allCountries: ReactSelectCountries.CountryData[] =
  CountryList().getData();
export const supportedCountryCodes: string[] = getCountries();

export const supportedCountries: SelectOption[] = allCountries
  .filter((country: ReactSelectCountries.CountryData) => {
    return supportedCountryCodes.includes(country.value);
  })
  .map((country: ReactSelectCountries.CountryData) => ({
    label: country.label,
    value: country.value,
    phoneCode: `+${getPhoneCode(country.value as CountryCode)}`
  }));

export const getCountryByCode = (countryCode: string): Nullable<SelectOption> =>
  supportedCountries.find(
    (country: SelectOption) => country.value === countryCode
  );
