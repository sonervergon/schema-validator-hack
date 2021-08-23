import Ajv from 'ajv';

export const ValidatorProvider = [
  {
    provide: 'JSON_SCHEMA_VALIDATOR',
    useFactory: () => new Ajv(),
  },
];
