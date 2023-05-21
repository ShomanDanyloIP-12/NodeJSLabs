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

function arrayChangeDelete<T>(array: T[], deleteRule: (item: T) => boolean): T[] {
  const deletedElements: T[] = [];
  
  for (let i = array.length - 1; i >= 0; i--) {
    if (deleteRule(array[i])) {
      deletedElements.push(array[i]);
      array.splice(i, 1);
    }
  }
  
  return deletedElements;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log(array); // [1, 3, 7, 9]
console.log(deletedElements); // [6, 2]
