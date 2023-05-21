type Add = {
    (): number;
    (num: number): Add;
};

function add(a: number): Add {
    return function (b?: number) {
        if (!b) {
            return a;
        }
        return add(a + b);
    } as Add;
}
console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
console.log(add(2)(5)(7)(1)(6)(5)(11)(3)()); // 40

function areAnagrams(s1: string, s2: string): boolean {
    const normalize = (str: string) =>
        str.toLowerCase().split('').sort().join('');
    return normalize(s1) === normalize(s2);
}

console.log(areAnagrams('shoman', 'hmanos'));  // true
console.log(areAnagrams('anagram', 'alagram'));  // false

type UnknownObject = { [key: string]: unknown };

function deepClone(obj: UnknownObject): UnknownObject {
    const clone: UnknownObject = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            clone[key] = (typeof value === "object" && value !== null) ? deepClone(value as UnknownObject) : value;
        }
    }

    return clone;
}

const obj1 = {a: 1, b: {c: 2, d: {e: 3}}};
const clonedObj1 = deepClone(obj1);
console.log(clonedObj1); // {a: 1, b: {c: 2, d: {e: 3}}}

const obj2 = {x: "Shoman", y: ["Danylo", "IP-12"], z: {p: "clone"}};
const clonedObj2 = deepClone(obj2);
console.log(clonedObj2); // {x: "Shoman", y: ["Danylo", "IP-12"], z: {p: "clone"}}

const obj3 = {name: "Danylo", details: {work: "student", group_number: 12}};
const clonedObj3 = deepClone(obj3);
console.log(clonedObj3); // {name: "Danylo", details: {work: "student", group_number: 12}}

type FunctionToWrap = (...args: number[]) => number;

function wrapper(fn: FunctionToWrap): FunctionToWrap {
    const cache = new Map<string, number>();
    
    return (...args: number[]) => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            const cachedResult = cache.get(key);
            if (typeof cachedResult === 'number') {
                console.log(`${cachedResult} from cache`);
                return cachedResult;
            }
        }
        
        const result = fn(...args);
        cache.set(key, result);
        console.log(`${result} calculated`);
        return result;
    };
}

const fadd = (...args: number[]) => args.reduce((a, b) => a + b, 0);
const cachedAdd = wrapper(fadd);

console.log(cachedAdd(2,2,3)); // 7
console.log(cachedAdd(5,8,1)); // 14
console.log(cachedAdd(2,2,3)); // 7 from cache
