export const getUseCaseName = <F extends (...args: never[]) => unknown>(
  createUseCase: F,
): string => {
  const matcher = createUseCase.name.match(/create(.)(.*)UseCase/);
  if (matcher === null) return "";
  return matcher[1].toLowerCase() + matcher[2];
};
