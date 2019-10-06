import Joi from '@hapi/joi';

export const createAuthValidationObject = (method, path) => {
  if (path.includes('/admin-signup') && method === 'POST') {
    return {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.ref('password'),
      email: Joi.string().email().required(),
      username: Joi.string().min(3).required(),
      gender: Joi.string().valid('male', 'Male', 'female', 'Female').required()
    }
  } else if (path === '/admin-signin' && method === 'POST') {
    return {
      email: Joi.string().email().required().required(),
      password: Joi.string().required()
    }
  } else if (path === '/signup' && method === 'POST') {
    return {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.ref('password'),
      email: Joi.string().email().required(),
      username: Joi.string().min(3).required(),
      gender: Joi.string().valid('male', 'Male', 'female', 'Female').required()
    }
  } else if (path === '/signin' && method === 'POST') {
    return {
      email: Joi.string().email().required().required(),
      password: Joi.string().required()
    }
  }
};

export const createTeamValidationObject = (method, path) => {
  if (path === '/' && method === 'POST') {
    return {
      teamName: Joi.string().required(),
      stadium: Joi.string().required(),
      location: Joi.string().required()
    }
  } else {
    return {
      teamName: Joi.string(),
      stadium: Joi.string(),
      location: Joi.string()
    }
  }
};

export const createFixtureValidationObject = (method, path) => {
  if (path === '/' && method === 'POST') {
    return {
      date: Joi.date().timestamp('javascript').required(),
      description: Joi.string().required(),
      homeTeamId: Joi.string().required(),
      awayTeamId: Joi.string().required(),
      homeTeamScore: Joi.number().integer().required(),
      awayTeamScore: Joi.number().integer().required(),
      state: Joi.string().valid('pending', 'played').required()
    }
  } else{
    return {
      date: Joi.date().timestamp('javascript'),
      description: Joi.string(),
      homeTeamId: Joi.string(),
      awayTeamId: Joi.string(),
      homeTeamScore: Joi.number().integer(),
      awayTeamScore: Joi.number().integer(),
      state: Joi.string().valid('pennding', 'played')
    }
  }
};