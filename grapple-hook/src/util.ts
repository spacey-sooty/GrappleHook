export function withVal<T,R>(val: T|null|undefined, fn: (v: T) => R|null) {
  if (val !== null && val !== undefined)
    return fn(val)
  return null
}

export function withValU<T,R>(val: T|null|undefined, fn: (v: T) => R|undefined) {
  if (val !== null && val !== undefined)
    return fn(val)
  return undefined
}

export type Combine<A, B> = A & Omit<B, keyof A>;
export type VariantKeys<T> = T extends any ? keyof T : never;

export function interleave<T>(arr: T[], fn: () => T): T[] {
  return arr.flatMap(n => [n, fn()]).slice(0, -1);
}

export function unpackToData(obj: any): { [k: string]: any } {
  let data = flattenObj(obj);
  let out: { [k: string]: any } = {};

  Object.keys(data).forEach(k => {
    out[`data-${k}`] = data[k];
  })

  return out;
}

export function flattenObj(obj: any, prefix?: string): { [k: string]: any } {
  let out: { [k: string]: any } = {};

  Object.keys(obj).forEach(k => {
    const v = obj[k];
    if (typeof v === "object") {
      out = { ...out, ...flattenObj(v, prefix ? `${prefix}-${String(k)}` : String(k)) }
    } else {
      if (prefix != null)
        out[`${prefix}-${k}`] = v;
      else
        out[k] = v;
    }
  })

  return out;
}

export function nullIfEmpty(s: string | null | undefined) : string|null {
  if (s === "" || s === null || s === undefined || (((typeof s) === "string") && s.trim() === ""))
    return null;
  return s;
}

export function undefinedIfEmpty(s: string | null | undefined) : string|undefined {
  return nullIfEmpty(s) || undefined;
}

export function maybeParseInt(s: string | null | undefined) : number | undefined {
  const m = undefinedIfEmpty(s);
  if (m != null)
    return parseInt(m);
  else
    return undefined;
}

export function capitalise(s: string) : string {
  if (s.length <= 1)
    return s.toUpperCase();
  else
    return s.charAt(0).toUpperCase() + s.slice(1);
}