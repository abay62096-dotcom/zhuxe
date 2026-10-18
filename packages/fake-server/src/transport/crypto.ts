/**
 * Layer 1 – crypto primitives wrapper.
 *
 * Re-exports bit-exact cryptographic primitives from zhuxee-assistance. No protocol
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
} from 'zhuxee-assistance/crypto'
export type { SignalKeyPair } from 'zhuxee-assistance/crypto'
export { WaMediaCrypto } from 'zhuxee-assistance/media'
