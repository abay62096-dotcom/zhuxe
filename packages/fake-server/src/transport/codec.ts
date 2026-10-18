/**
 * Layer 1 – binary stanza codec wrapper.
 *
 * Re-exports the bit-exact WhatsApp WAP token encoder/decoder from zhuxee-assistance.
 * This file is the only sanctioned import path for binary node serialization
 * inside the fake server.
 */

export {
    decodeBinaryNode,
    decodeBinaryNodeStanza,
    encodeBinaryNode,
    encodeBinaryNodeStanza,
    verifyNoiseCertificateChain
} from 'zhuxee-assistance/transport'
export type { BinaryNode, WaNoiseRootCa } from 'zhuxee-assistance/transport'
