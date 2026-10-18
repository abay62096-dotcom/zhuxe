/**
 * Layer 1 – byte/encoding primitives wrapper.
 *
 * Re-exports bit-exact byte helpers from zhuxe-assistance so Layer 2/3 of the fake
 * server can use them without importing zhuxe-assistance directly.
 */

export {
    bytesToBase64,
    bytesToBase64UrlSafe,
    bytesToHex,
    decodeBase64Url,
    toError
} from 'zhuxe-assistance/util'

export const TEXT_ENCODER = new TextEncoder()
export const TEXT_DECODER = new TextDecoder()
