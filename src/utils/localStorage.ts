export function getRefreshToken() {
  return localStorage.getItem('refreshToken') || '';
}

export function removeRefreshToken() {
  localStorage.removeItem('refreshToken');
}

export function getHasKeepLogin() {
  return localStorage.getItem('keepLogin') === 'true';
}

export function removeHasKeepLogin() {
  localStorage.removeItem('keepLogin');
}
