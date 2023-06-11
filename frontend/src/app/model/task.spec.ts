import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task("Label", "Michel", "01/01/2000", 18, 12)).toBeTruthy();
  });
});
