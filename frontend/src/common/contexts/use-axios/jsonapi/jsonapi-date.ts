
export type DateOnly = Date

export function fromDateOnlyString(src: string) {
    const dateParts = src.split('-').map(s => parseInt(s, 10))
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
}

export const toISODateOnly = (src: DateOnly) => src.toISOString().split('T')[0];

export function toISOLocal(d: Date) {
    const z  = (n: number) =>  ('0' + n).slice(-2);
    const zz = (n: number) => ('00' + n).slice(-3);
    let off = d.getTimezoneOffset();
    const sign = off > 0? '-' : '+';
    off = Math.abs(off);

    return d.getFullYear() + '-'
           + z(d.getMonth()+1) + '-' +
           z(d.getDate()) + 'T' +
           z(d.getHours()) + ':'  +
           z(d.getMinutes()) + ':' +
           z(d.getSeconds()) + '.' +
           zz(d.getMilliseconds()) +
           sign + z(off/60|0) + ':' + z(off%60);
  }