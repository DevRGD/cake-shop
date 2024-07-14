export const hashPassword = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
