import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(message || 'User not found', statusCode || HttpStatus.NOT_FOUND);
  }
}

export class LoginTypeInvalidException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Login type invalid',
      statusCode || HttpStatus.UNAUTHORIZED,
    );
  }
}

export class AlreadyHaveAccountException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Already have account please try to login',
      statusCode || HttpStatus.NOT_ACCEPTABLE,
    );
  }
}

export class SomeThingWentWrongException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Something went wrong',
      statusCode || HttpStatus.BAD_REQUEST,
    );
  }
}

export class ProductIdsInvalidException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Cannot place order,product not found',
      statusCode || HttpStatus.NOT_FOUND,
    );
  }
}

export class ProductOutOfStockException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Cannot place order,product is out of stock',
      statusCode || HttpStatus.BAD_REQUEST,
    );
  }
}

export class NotFountException extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Something not found',
      statusCode || HttpStatus.NOT_FOUND,
    );
  }
}

export class OrderNotFound extends HttpException {
  constructor(message?: string, statusCode?: number) {
    super(
      message || 'Order cannot be found against given id',
      statusCode || HttpStatus.NOT_FOUND,
    );
  }
}