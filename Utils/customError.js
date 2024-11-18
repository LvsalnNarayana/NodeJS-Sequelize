const customError = ({ status, message, name, stack }) => {
  const error = new Error(message);
  error.stack = error.stack;
  error.status = status;
  error.name = name;
  return error;
};
export default customError;
