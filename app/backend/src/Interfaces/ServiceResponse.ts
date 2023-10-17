type ServiceResponseSuccessType = 'SUCCESSFUL' | 'CREATED';
type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'CONFLICT' |
'INVALID_VALUE';
export type ServiceResponseSuccess<T> = { status: ServiceResponseSuccessType, data: T };
export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
export type ServiceResponseError = { status: ServiceResponseErrorType, data: { message: string } };
