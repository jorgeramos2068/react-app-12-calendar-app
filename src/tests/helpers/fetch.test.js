import { noTokenFetch, tokenFetch } from '../../helpers/fetch';

describe('Tests in fetch helper', () => {
  test('Should perform a call to an endpoint using noTokenFetch function', async () => {
    jest.setTimeout(3000);
    const endpoint = 'auth';
    const data = {
      email: 'test@test.com',
      password: '12345'
    }
    const resp = await noTokenFetch(endpoint, data, 'POST');
    expect(resp instanceof Response).toBe(true);
  });

  test('Should perform a call to an endpoint using tokenFetch function', async () => {
    jest.setTimeout(3000);
    const token = 'test_token';
    localStorage.setItem('token', token);
    const endpoint = 'auth';
    const data = {
      email: 'test@test.com',
      password: '12345'
    }
    const resp = await tokenFetch(endpoint, data, 'POST');
    expect(resp instanceof Response).toBe(true);
  });
});
