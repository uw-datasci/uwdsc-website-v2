import { TRPCError } from '@trpc/server';
import { rawRateLimitMiddleware } from '../server/rateLimiter';
import type { Context } from '../server/context';

describe('rateLimitMiddleware', () => {
  const next = jest.fn().mockResolvedValue('next called');

  function createCtx(userId?: string, ip?: string): Context {
    return {
      user: userId
        ? { id: userId, username: '', email: '', role: 'member' }
        : null,
      ip: ip ?? null,
      mongoose: {} as any,
      req: {} as any,
      res: {} as any,
    };
  }

  beforeEach(() => {
    next.mockClear();
  });

  it('allows request with user id', async () => {
    const ctx = createCtx('user-1', undefined);
    const result = await rawRateLimitMiddleware({ ctx, next });
    expect(result).toBe('next called');
    expect(next).toHaveBeenCalled();
  });

  it('allows request with ip', async () => {
    const ctx = createCtx(undefined, '127.0.0.1');
    const result = await rawRateLimitMiddleware({ ctx, next });
    expect(result).toBe('next called');
    expect(next).toHaveBeenCalled();
  });

  it('throws if no user and no ip', async () => {
    const ctx = createCtx(undefined, undefined);
    await expect(rawRateLimitMiddleware({ ctx, next })).rejects.toThrow(TRPCError);
    expect(next).not.toHaveBeenCalled();
  });

  it('throws if rate limit exceeded', async () => {
    const ctx = createCtx('rate-limit-test', undefined);

    // call limiter to exhaust points
    for (let i = 0; i < 100; i++) {
      await rawRateLimitMiddleware({ ctx, next });
    }

    await expect(rawRateLimitMiddleware({ ctx, next })).rejects.toThrow(TRPCError);
  });
});
