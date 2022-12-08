export function queriesToString<T extends Record<string, any>>(queries: T) {
  Object.keys(queries).forEach(key => {
    if (queries[key] === null) delete queries[key];
    if (queries[key] === undefined) delete queries[key];
    if (typeof queries[key] === "string" && queries[key].trim() === "")
      delete queries[key];
  });

  return Object.keys(queries)
    .map(key => {
      return `${key}=${queries[key]}`;
    })
    .join("&");
}

export function uRupiah(value: number) {
  const result = value.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
  return result;
}

export function uHandleDuplicates<T extends Record<string, any>>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
): T[] {
  // Create a new Map object to store the unique objects.
  const uniqueObjects = new Map();
  for (const obj of arr) {
    let isUnique = true;

    uniqueObjects.forEach((value, key) => {
      if (compareFn(obj, value)) {
        isUnique = false;
        return;
      }
    });

    if (isUnique) {
      uniqueObjects.set(obj, obj);
    }
  }

  return Array.from(uniqueObjects.values());
}
