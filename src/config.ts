import { get } from 'env-var';

export const config = {
  service: get('SERVICE').required().asString(),
  port: get('PORT').required().asPortNumber(),
  endpoint: get('ENDPOINT').required().asString()
};
