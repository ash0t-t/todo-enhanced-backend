class Validator {
  static isNotEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }
  static isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
  static isPositiveInteger(value) {
    return Number.isInteger(value) && value >= 0;
  }
}

module.exports = Validator;