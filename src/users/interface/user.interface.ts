import { CreateUserDto } from "../dto/create-user.dto";

export interface UserInterface {
  //1-1 회원가입
  createUser(userInfo: CreateUserDto): Promise<{ userIdx: number }>;

  // 1-5 모든 FCM 토큰 조회
  getAllFCM(): Promise<Record<"fcmTokens", object>>;

  // 1-6 개인 FCM 토큰 조회
  getFCMByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
}
