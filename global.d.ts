type Nullable<T> = T | null | undefined;

type ArrayOfNullable<T> = Array<T | null>;

declare namespace ReactSelectCountries {
  interface CountryData {
    label: string;
    value: string;
  }

  interface LabelValueMap {
    [key: string]: string;
  }

  interface Countries {
    data: CountryData[];
    labelMap: LabelValueMap;
    valueMap: LabelValueMap;
  }

  interface NativeCountries extends Countries {
    nativeData: CountryData[];
  }
}
