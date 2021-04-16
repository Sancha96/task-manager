export const jwtConstants = {
  secret: "secretKey",
};

export const jwtOptions = {
  ...jwtConstants,
  signOptions: {
    expiresIn: '1d',
  },
};
