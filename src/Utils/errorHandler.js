export const errorHandler = (err, navigate) => {
  const {
    data: { msg },
    status,
  } = err.response;
  navigate("/error", { state: { msg, status } });
};
