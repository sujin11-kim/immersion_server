import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "mymodel/entities/User";
import { Repository } from "typeorm";
import { LoginRequestDto } from "./dto/login.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class AuthService {
  private readonly axiosInstance: AxiosInstance;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
    this.axiosInstance = axios.create({
      baseURL: 'https://kapi.kakao.com/v1/user/access_token_info',
    })
  }

  async jwtLogIn(data: LoginRequestDto) {
    const { id, password } = data;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException({ token: "" }, 201);
    }

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password
    );

    const payload = { id };

    if (user && (await bcrypt.compare(password, user.password))) {
      return { token: this.jwtService.sign(payload) };
    } else {
      throw new HttpException({ token: "" }, 201);
    }
  }

  async kakaoTokenToLocalToken(token: string): Promise<any>{
  try{
    /* 카카오 서버에 토큰 유효성 검사 */
    // const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // });
    const response = await this.axiosInstance.get('', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const kakaoUser = new User();
    kakaoUser.id = response.data.id;
    kakaoUser.nickName = response.data.properties.nickname;

    /* 회원가입 */
    await this.userRepository.save(kakaoUser);
    /* useridx 추가해서 새로 발급 */
    const id = kakaoUser.id;
    const user = await this.userRepository.findOneBy({ id });
    const payload = { userIdx : user.userIdx };
    return { token: this.jwtService.sign(payload) };
  } catch (error) {
    throw new HttpException({token: ''},201);
    }
  }
}
