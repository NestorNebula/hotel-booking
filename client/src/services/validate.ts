type validateInstance = ReturnType<typeof validate>;

function validate(fieldName: string, fieldValue: string) {
  const name = fieldName;
  let value = fieldValue;

  const errors: string[] = [];

  function notEmpty(this: validateInstance) {
    if (!value) {
      errors.push(`${name} is required.`);
    }
    return this;
  }

  function isLength(
    this: validateInstance,
    { min, max }: { min?: number; max?: number }
  ) {
    if (min && value.length < min) {
      errors.push(`${name} must have at least ${min} characters.`);
    } else if (max && value.length > max) {
      errors.push(`${name} cannot have more than ${max} characters.`);
    }
    return this;
  }

  function isFormat(this: validateInstance, regex: RegExp, example?: string) {
    if (!regex.test(value)) {
      errors.push(
        `${name} isn't in the correct format. ${
          example && `Example: ${example}`
        }`
      );
    }
    return this;
  }

  function toLowerCase(this: validateInstance) {
    value = value.toLowerCase();
    return this;
  }

  function result(): { value: typeof value; errors: typeof errors } {
    return { value, errors };
  }

  return {
    notEmpty,
    isLength,
    isFormat,
    toLowerCase,
    result,
  };
}

export default validate;
