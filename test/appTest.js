// https://www.youtube.com/watch?v=MLTRHc5dk6s&ab_channel=TraversyMedia

const assert = require("chai").assert;
const { sayHello } = require("../app");

describe("sayHello", function () {
  it("sayHello should return hello", function () {
    let result = sayHello();
    assert.equal(result, "hello");
  });

  it("sayHello should be a string", function () {
    let result = sayHello();
    assert.typeOf(result, "string");
  });
});
