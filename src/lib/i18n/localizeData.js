// Shared helper for localizing static content records in src/data/*.js.
//
// Each translatable record carries its Somali overrides under a
// `translations: { so: { ... } }` key, holding only the fields that
// differ from the English base record. `localize()` merges those
// overrides one level deep (so nested objects like `story: {...}` merge
// key-by-key, while arrays like `highlights` are replaced wholesale)
// and returns a plain record with the same shape as the English one —
// so components that already render `.title`, `.description`, etc. as
// strings need no changes beyond passing `language` in.
export function localize(record, language) {
  if (!record || language === 'en') return record;
  const overrides = record.translations?.[language];
  if (!overrides) return record;

  const merged = { ...record };
  for (const key of Object.keys(overrides)) {
    const value = overrides[key];
    const base = record[key];
    if (
      value && typeof value === 'object' && !Array.isArray(value) &&
      base && typeof base === 'object' && !Array.isArray(base)
    ) {
      merged[key] = { ...base, ...value };
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

export function localizeList(records, language) {
  if (!Array.isArray(records)) return records;
  return records.map((record) => localize(record, language));
}
