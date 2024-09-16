const errors = {
  offset: 'Invalid Offset',
  limit: 'Invalid Limit',
  quantity: 'Invalid Quantity',
  title: 'Invalid Title',
  notFound: 'Item Not Found',
};

class CustomError extends Error {
  constructor(msg, code) {
    super(msg);
    this.name = msg;
    this.code = code;
  }
}

class InvalidOffset extends CustomError {
  constructor() {
    super(errors.offset, 600);
  }
}

class InvalidLimit extends CustomError {
  constructor() {
    super(errors.limit, 601);
  }
}

class InvalidQuantity extends CustomError {
  constructor() {
    super(errors.quantity, 602);
  }
}

class InvalidTitle extends CustomError {
  constructor() {
    super(errors.title, 603);
  }
}

class ItemNotFound extends CustomError {
  constructor() {
    super(errors.notFound, 604);
  }
}

module.exports = { InvalidLimit, InvalidOffset, InvalidQuantity, InvalidTitle, ItemNotFound };