function add(n) {
    let sum = n;
    function f(n) {
        if (n !== undefined) {
            sum += n;
            return f;
        } else {
            return sum;
        }
    }
    return f;
}

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
console.log(add(2)(5)(7)(1)(6)(5)(11)(3)()); // 40

function areAnagrams(stringA, stringB) {
    let sortedStringA = stringA.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
    let sortedStringB = stringB.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
    return sortedStringA === sortedStringB;
}

console.log(areAnagrams('shoman', 'hmanos')); // True
console.log(areAnagrams('anagram', 'alagram')); // False


function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let original = { a: 1, b: { c: 2 } };
let clone = deepClone(original);

console.log(clone); // { a: 1, b: { c: 2 } }

original.a = 10;
original.b.c = 20;

console.log(original); // { a: 10, b: { c: 20 } }
console.log(clone); // { a: 1, b: { c: 2 } }

function cache(func) {
    const cache = new Map();

    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(`Getting from cache: ${key}`);
            return cache.get(key);
        } else {
            console.log(`Calculating result for: ${key}`);
            const result = func(...args);
            cache.set(key, result);
            return result;
        }
    };
}

const calc = (a, b, c) => a + b + c;
const cachedCalc = cache(calc);

console.log(cachedCalc(2,2,3)); // 7
console.log(cachedCalc(5,8,1)); // 14
console.log(cachedCalc(2,2,3)); // 7 - from cache