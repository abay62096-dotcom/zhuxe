/**
 * Layer 1 – crypto primitives wrapper.
 *
 * Re-exports bit-exact cryptographic primitives from zhuxe-assistance. No protocol
 * interpretation, so reusing them does not create a test-vs-impl tautology.
 */

export {
    aesCbcDecrypt,
    aesCbcEncrypt,
    aesGcmDecrypt,
    aesGcmEncrypt,
    Ed25519,
    hkdf,
    hkdfSplit,
    hmacSha256Sign,
    hmacSha512Sign,
    prependVersion,
    randomBytesAsync,
    randomIntAsync,
    readVersionedContent,
    sha256,
    sha512,
    toRawPubKey,
    toSerializedPubKey,
    X25519,
    xeddsaSign,
    xeddsaVerify
} from 'zhuxe-assistance/crypto'
export type { SignalKeyPair } from 'zhuxe-assistance/crypto'
export { WaMediaCrypto } from 'zhuxe-assistance/media'
