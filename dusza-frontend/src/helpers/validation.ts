export const validateLength = (
  current: number,
  required: number,
): { errorFlag: boolean; errorMsg: string } => {
  if (current < required) {
    return {
      errorFlag: true,
      errorMsg: "Too short",
    };
  }

  return {
    errorFlag: false,
    errorMsg: "",
  };
};
