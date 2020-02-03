export const pending = actionCreator => `${actionCreator.toString()}_PENDING`;

export const fulfilled = actionCreator => `${actionCreator.toString()}_FULFILLED`;

export const rejected = actionCreator => `${actionCreator.toString()}_REJECTED`;
