async function runSequent<T, U>(
  array: T[], 
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(await callback(array[i], i));
  }
  return result;
}

(async () => {
  const array: Array<string> = ["one", "two", "three"];
  const results = await runSequent(array, (item, index) =>
    Promise.resolve({
        item,
        index,
    })
  );
  console.log(results); //{ item: 'one', index: 0 },{ item: 'two', index: 1 },{ item: 'three', index: 2 }
})();

