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