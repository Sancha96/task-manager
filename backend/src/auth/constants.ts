export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const jwtOptions = {
  ...jwtConstants,
  signOptions: {
    expiresIn: '1d',
  },
};
