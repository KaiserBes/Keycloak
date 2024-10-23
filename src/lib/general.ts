export function getError(error: any) {
  return error?.data?.message || error?.message || "Что то пошло не так";
}
