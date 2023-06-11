import { DayTab } from './day-tab';

describe('DayTab', () => {
  it('should create an instance', () => {
    expect(new DayTab("test", [], new Date())).toBeTruthy();
  });
});
