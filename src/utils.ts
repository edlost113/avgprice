export const capitalize = (str: string) => str?.replace(/\b\w/g, (substr) => substr.toUpperCase());

export const encode = (str: string) => encodeURIComponent(str);

/**
 * If argument is a string, try to parse as JSON.
 * Otherwise return null.
 */
export function parseOrNull(raw: unknown) {
  if (!raw) {
    return null;
  }
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  return null;
}
function getRand(min: number, max: number): number {
  const num = (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
  return num;
}
export const random = (min: number, max: number): number => getRand(min, max);

type SetRandomInterval = (
  intervalFunction: () => void,
  minDelay: number,
  maxDelay: number
) => { clear: () => void };

/**
 * Repeatedly calls a function with a random time delay between each call.
 *
 * @param intervalFunction - A function to be executed at random times between `minDelay` and
 * `maxDelay`. The function is not passed any arguments, and no return value is expected.
 * @param minDelay - The minimum amount of time, in milliseconds (thousandths of a second), the
 * timer should delay in between executions of `intervalFunction`.
 * @param maxDelay - The maximum amount of time, in milliseconds (thousandths of a second), the
 * timer should delay in between executions of `intervalFunction`.
 */
const setRandomInterval: SetRandomInterval = (intervalFunction, minDelay = 0, maxDelay = 0) => {
  let timeout: ReturnType<typeof setTimeout>;

  const runInterval = (): void => {
    timeout = globalThis.setTimeout(
      () => {
        intervalFunction();
        runInterval();
      },
      random(minDelay, maxDelay)
    );
  };

  runInterval();

  return {
    clear(): void {
      clearTimeout(timeout);
    },
  };
};

export default setRandomInterval;
