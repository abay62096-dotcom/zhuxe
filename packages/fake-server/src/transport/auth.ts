/**
 * Layer 1 – credential/store type wrapper.
 *
 * Re-exports the auth and store types from zhuxe-assistance so the fixture layer can
 * seed a registered session without importing zhuxe-assistance directly.
 */

export type { WaAuthCredentials, WaMobileTransportDeviceInfo } from 'zhuxe-assistance/auth'
export type { WaStore } from 'zhuxe-assistance/store'
