type SerializableObject = Record<string, unknown>;

function isSerializable(obj: unknown): boolean {
  if (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean" ||
    obj === null
  ) {
    return true;
  } else if (Array.isArray(obj)) {
    return obj.every((item) => isSerializable(item));
  } else if (typeof obj === "object") {
    return Object.values(obj).every((val) => isSerializable(val));
  } else {
    return false;
  }
}

export function makeObjectSerializable(
  obj: SerializableObject
): SerializableObject {
  const serializable: SerializableObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isSerializable(value)) {
      serializable[key] = value;
    } else if (Array.isArray(value)) {
      serializable[key] = value.map((item) =>
        isSerializable(item) ? item : makeObjectSerializable(item)
      );
    } else if (typeof value === "object" && value !== null) {
      serializable[key] = makeObjectSerializable(value as SerializableObject);
    }
  }
  return serializable;
}
