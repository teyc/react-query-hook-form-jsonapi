
export type DateOnly = Date

/**
 * react-hook-form may try to call this on initialization
 * @param src
 * @returns
 */
export function fromDateOnlyString(src: string) {
    const dateParts = src.split('-').map(s => parseInt(s, 10))
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
}

export function fromDateString(src: string): Date | null {
    const date = new Date(src)
    return date instanceof Date && !isNaN(Number(date)) ? date : null
}

export const toISODateOnly = (src: DateOnly | null) =>
    src?.toISOString().split('T')[0]

export function toISOLocal(d: Date | null) {

    if (d == null) return null

    const z = (n: number) => ('0' + n).slice(-2)
    const zz = (n: number) => ('00' + n).slice(-3)
    let off = d.getTimezoneOffset()
    const sign = off > 0 ? '-' : '+'
    off = Math.abs(off);

    return d.getFullYear() + '-'
        + z(d.getMonth() + 1) + '-' +
        z(d.getDate()) + 'T' +
        z(d.getHours()) + ':' +
        z(d.getMinutes()) + ':' +
        z(d.getSeconds()) + '.' +
        zz(d.getMilliseconds()) +
        sign + z(off / 60 | 0) + ':' + z(off % 60)
}