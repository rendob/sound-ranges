abstract class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class TypeAssertionError extends ValidationError {
  constructor(type: string, message: string) {
    super(`not assignable to ${type}.\n${message}`);
  }
}

export class InitializationError extends ValidationError {
  constructor(type: string, message: string) {
    super(`invalid initialization of ${type}.\n${message}`);
  }
}
