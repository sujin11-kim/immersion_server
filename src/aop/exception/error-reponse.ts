import { BadRequestException, HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class ErrorResponse {
  constructor() {}

  public notAuthorization() {
    throw new HttpException({ token: "not authorization" }, 401);
  }

  public notAuthorizationLogin() {
    throw new HttpException({ token: "userIdx가 유효하지 않습니다." }, 402);
  }

  public notAuthorizationKakao() {
    throw new HttpException({ token: "not authorization kakao login" }, 403);
  }

  public notAuthorizationApple() {
    throw new HttpException({ token: "not authorization apple login" }, 404);
  }

  public notExistUser() {
    throw new BadRequestException({
      statusCode: 2000,
      message: "존재하지 않는 유저입니다.",
      result: { userIdx: "" },
  })};

  public duplicateByEmail() {
    throw new BadRequestException({
    statusCode: 2001,
    message: "이미 존재하는 이메일입니다.",
    result: { userIdx: "" },
  })};

  public duplicateByNickname() {
    throw new BadRequestException({
      statusCode: 2002,
      message: "이미 존재하는 닉네임입니다.",
      result: { userIdx: "" },
    })};

  public duplicateByPhone() {
    throw new BadRequestException({
      statusCode: 2003,
      message: "이미 존재하는 핸드폰 번호입니다.",
      result: { userIdx: "" },
  })};

  public notExistFCM() {
    throw new BadRequestException({
      statusCode: 2004,
      message: "fcmToken이 존재하지 않습니다.",
      result: { fcmTokens: {} },
  })};

  public notExistPassword() {
    throw new BadRequestException({
      statusCode: 2005,
      message: "비밀번호가 존재하지 않습니다.",
      result: { password: "" },
  })};

  public comparePassword(existPassword) {
    throw new BadRequestException({
      statusCode: 2006,
      message: "비밀번호가 일치하지 않습니다.",
      result: { existPassword: existPassword },
  })};
}