declare module 'sperror' {
  export default class Sperror extends Error {
    title: string;
    msg?: string;
    statusCode: number;

    constructor(title: string, message?: string, statusCode = 500) {
      super(message || title);
      this.title = title;
      this.msg = message;
      this.statusCode = statusCode;
    }
  }
}
