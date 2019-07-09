var date = new Date();
let firstDayOfMonth = Math.round(
  new Date(date.getFullYear(), date.getMonth(), 1).getTime()
);
let lastDayOfMonth = Math.round(
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
);

export function timeWithinRange(
  time,
  start = firstDayOfMonth,
  end = lastDayOfMonth
) {
  console.log('time:', time, 's:', start, 'e: ', end);
  if (time <= lastDayOfMonth && time >= firstDayOfMonth) {
    return true;
  }

  return false;
}
