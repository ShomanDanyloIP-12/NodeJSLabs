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