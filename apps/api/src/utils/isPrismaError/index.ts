const isPrismaError = (error: any): boolean => {
  if (typeof error === 'object' && error !== null && 'code' in error)
    return true;
  return false;
};

export default isPrismaError;
