const world = 'world world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}

export function test() {
  console.log('Yay :: only testing a function call!!!');
}
