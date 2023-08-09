import { Test, TestingModule } from '@nestjs/testing';
import { AppleJwtTokenPayload, AppleLoginStategy } from '../inferface/apple-login.implement';

describe('AuthService', () => {

  it('email include valid Apple ID token', async () => {
    // 이메일 OK 애플 ID 토큰 (실제로는 애플 개발자 계정에서 발급받아야 합니다)
    const fakeAppleIdToken = 'eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiSmFzb24uaW1tZXJzaW9uLWlPUyIsImV4cCI6MTY5MDU1MTI5OSwiaWF0IjoxNjkwNDY0ODk5LCJzdWIiOiIwMDE1NDkuZWIwMzk3N2NiZmJmNGYyNDhhMmE0YTc5YWY0ZjY2ZjkuMTIyNSIsImNfaGFzaCI6IlduamZhU19ud2pGWUVHSFE0WXFNcFEiLCJlbWFpbCI6InFvZHduc2tmaDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNjkwNDY0ODk5LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.DZmTUeAZFSKFqtOPf7KOlry5PEUgIfEXMXu4NWybR1zzRlzgSLhsJUmSPSxKd2vfFwkoR2mTD4ntoyt2o0ajHLRRDgjIDWkf5vsX4Ioel1NCCVaCOK8tDltKXH41jYA_FJmuB21zCCpMoCQKzL70n9AXRTNdHlVWR8G7kDRVKhq3xrF4eRwTq8hqkc8s6AcA89Stb0gma4aamr-1I_uJ4LGvvVaOgSm77OvTqX-MuQUNLEiQCU8zXjSkQre-8pv_4KGKmi8BhmKbP1G-Ff5RVKtvJrPxoo7Dxi9eX91lk03_DmRyCSckv4mnRU9_iIM15eALwm6b81HGLFwxpD6sxA';

    // 이메일 OK 애플 ID 토큰을 사용하여 테스트
    const verifiedToken: AppleJwtTokenPayload = await AppleLoginStategy(fakeAppleIdToken);

    // 테스트 결과를 검증 (예시로 iss, aud, email 필드가 존재하는지 검증)
    expect(verifiedToken.iss).toBe('https://appleid.apple.com');
    expect(verifiedToken.aud).toBe('Jason.immersion-iOS');
    expect(verifiedToken.email).toBe('qodwnskfh1@gmail.com');
  });

  it('email not include valid Apple ID token', async () => {
    // 가짜 애플 ID 토큰 (실제로는 애플 개발자 계정에서 발급받아야 합니다)
    const fakeAppleIdToken = 'eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiSmFzb24uaW1tZXJzaW9uLWlPUyIsImV4cCI6MTY5MDU1NjM3NSwiaWF0IjoxNjkwNDY5OTc1LCJzdWIiOiIwMDE1NDkuZWIwMzk3N2NiZmJmNGYyNDhhMmE0YTc5YWY0ZjY2ZjkuMTIyNSIsImNfaGFzaCI6Imxzdkk1MHFWNEJ2SjMyOHpFSlRJM0EiLCJlbWFpbCI6InFvZHduc2tmaDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNjkwNDY5OTc1LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.nNzPz0Xx1tnxBJOjXopZ78bf3KXV8uJ0b_1_hdLxGJqhqUsNVOOVY6Wyd_uSg1Snz05LaBxKUymCwFS9iN-n4T5l-61P1drRF7IiBecJmSdz5vQu8otg_omt_7rhKLBaadlJ0QnON0iXpbtzqjSjehvcZtRnBhf69vXkIYvRtiBuq1Ul40TkhbTlQgg4_ouITviwxw0FmP9aZbuNfOWDiWVpq_8qEmQPfyPOcm84_42oc5B2wEQ4gexpzXIc-5o_c4KjzEQVMfGHS3rNNl9_2G-CdhnUpNmhxoFytRe9T-zmE0KS-MtPJg8BTBTfGdIMbdbI0smJbJEwOXtFgtLfag';

    // 가짜 애플 ID 토큰을 사용하여 테스트
    const verifiedToken: AppleJwtTokenPayload = await AppleLoginStategy(fakeAppleIdToken);

    // 테스트 결과를 검증 (예시로 iss, aud 필드가 존재하는지 검증)
    expect(verifiedToken.iss).toBe('https://appleid.apple.com');
    expect(verifiedToken.aud).toBe('Jason.immersion-iOS');
    expect(verifiedToken.email).toBe('qodwnskfh1@gmail.com');
  });

  it('should handle invalid Apple ID token', async () => {
    // 만료된 가짜 애플 ID 토큰
    const invalidAppleIdToken = 'eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiSmFzb24uaW1tZXJzaW9uLWlPUyIsImV4cCI6MTY5MDAzOTc0OSwiaWF0IjoxNjg5OTUzMzQ5LCJzdWIiOiIwMDE1NDkuZWIwMzk3N2NiZmJmNGYyNDhhMmE0YTc5YWY0ZjY2ZjkuMTIyNSIsImNfaGFzaCI6IktiX0NyeXJyT1NTS3UzaDRsN3lCSWciLCJlbWFpbCI6InFvZHduc2tmaDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNjg5OTUzMzQ5LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.pVfVxDwQQ7lgPAs-300xhySbcmNQHMhI5FZhWvDe9VCiHu0waikektk9qWJtATJLO16rHI13weNpv8HBRMAuCNjH2sI1jRZ3ek_c_T4SH60wG5MkF3GvqoPLbuXRLC-bYOeFfqfnMPjTULOKCEtXd-DAGW1PH4lkiN10XaB6X4nNYHGUJsISbP8ejyvWkk8FMaVMkfgWEAVXXuolcQXwILMpd65AxbZdMEAlQpUDbFNPkNEvnCswyiXjeyJ9ClmfwjAWc0K3lUzEbi0Y1PwHjCXAgsuYkb6_aZh-Evu90Lm8-zMilyuz5gC6R4jRqd_yrV7lrmxLGn-svCxTerI19g';

    try {
      // 테스트 시 예외가 발생할 수 있으므로 try-catch를 사용하여 처리
      await AppleLoginStategy(invalidAppleIdToken);
    } catch (error) {
      // 테스트 결과를 검증 (예상한 예외가 발생하는지 검증)
      expect(error.name).toBe('JsonWebTokenError');
    }
  });
});