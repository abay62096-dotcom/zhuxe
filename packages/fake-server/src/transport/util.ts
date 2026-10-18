/**
 * Layer 1 – byte/encoding primitives wrapper.
 *
 * Re-exports bit-exact byte helpers from zhuxee-assistance so Layer 2/3 of the fake
 * server can use them without importing zhuxee-assistance directly.
 */

export {
    bytesToBase64,
    bytesToBase64UrlSafe,
    bytesToHex,
    decodeBase64Url,
    toError
} from 'zhuxee-assistance/util'

export const TEXT_ENCODER = new TextEncoder()
export const TEXT_DECODER = new TextDecoder()
