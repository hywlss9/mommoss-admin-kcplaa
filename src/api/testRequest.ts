export default function testRequest<T>(response: T) {
  return new Promise<T>(resolve => {
    setTimeout(() => resolve(response), 500);
  });
}
