import { AdminauthMiddleware } from './adminauth.middleware';

describe('AdminauthMiddleware', () => {
  it('should be defined', () => {
    // @ts-ignore
    expect(new AdminauthMiddleware()).toBeDefined();
  });
});
