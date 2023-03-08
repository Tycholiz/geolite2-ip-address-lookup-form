import { makeObjectSerializable } from "./makeObjectSerializable";

describe("makeObjectSerializable", () => {
  test("serializes object with simple values", () => {
    const obj = {
      foo: "bar",
      baz: 42,
      qux: true,
      nullVal: null,
    };
    const expected = {
      foo: "bar",
      baz: 42,
      qux: true,
      nullVal: null,
    };
    expect(makeObjectSerializable(obj)).toEqual(expected);
  });

  test("serializes object with nested objects", () => {
    const obj = {
      foo: "bar",
      baz: {
        a: "apple",
        b: {
          c: "cherry",
          d: {
            e: "elderberry",
          },
        },
      },
    };
    const expected = {
      foo: "bar",
      baz: {
        a: "apple",
        b: {
          c: "cherry",
          d: {
            e: "elderberry",
          },
        },
      },
    };
    expect(makeObjectSerializable(obj)).toEqual(expected);
  });

  test("serializes object with nested arrays", () => {
    const obj = {
      foo: "bar",
      baz: [1, 2, [3, 4, [5, 6]]],
    };
    const expected = {
      foo: "bar",
      baz: [1, 2, [3, 4, [5, 6]]],
    };
    expect(makeObjectSerializable(obj)).toEqual(expected);
  });
});
