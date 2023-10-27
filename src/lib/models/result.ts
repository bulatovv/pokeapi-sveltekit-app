export type Result<ValueType, ErrorType> = {
    success: false,
    error: ErrorType,
} | {
    success: true,
    value: ValueType,
};

