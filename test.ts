// tests go here; this will not be compiled when this package is used as an extension.

let result;

function testFind() {
    // Test find
    result = arrays.find(["a", "b", "c"], "c");
    new tests.AssertEqual(result, 2);

    // Test find first occurence (of multiple)
    result = arrays.find(["a", "b", "b"], "b");
    new tests.AssertEqual(result, 1);

    // Test not found
    result = arrays.find(["a", "b", "c"], "d");
    new tests.AssertEqual(result, -1);
}

testFind();