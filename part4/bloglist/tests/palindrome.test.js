const palindrome = require("./forTesting").palindrome;

describe.skip("palindrome", () => { // remove .skip to re-enable test
  test("palindrome of a", () => {
    const result = palindrome("a");
    expect(result).toBe("a");
  });

  test("palindrome of react", () => {
    const result = palindrome("react");
    expect(result).toBe("tcaer");
  });

  test("palindrome of releveler", () => {
    const result = palindrome("releveler");
    expect(result).toBe("releveler");
  });
});
