export function login({ email, password }) {
  if (!email || !password) {
    return {
      ok: false,
      status: 401,
      error: "INVALID_CREDENTIALS"
    };
  }

  return {
    ok: true,
    status: 200,
    accessToken: "demo-access-token",
    refreshToken: "demo-refresh-token"
  };
}

export function isRefreshTokenExpired(expiresAt, now = new Date()) {
  return new Date(expiresAt).getTime() <= now.getTime();
}
