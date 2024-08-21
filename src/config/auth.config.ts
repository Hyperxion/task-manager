import * as Joi from '@hapi/joi';

export const authValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
});
