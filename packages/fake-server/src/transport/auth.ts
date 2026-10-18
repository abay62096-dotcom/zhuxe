/**
 * Layer 1 – credential/store type wrapper.
 *
 * Re-exports the auth and store types from zhuxee-assistance so the fixture layer can
 * seed a registered session without importing zhuxee-assistance directly.
 */

export type { WaAuthCredentials, WaMobileTransportDeviceInfo } from 'zhuxee-assistance/auth'
export type { WaStore } from 'zhuxee-assistance/store'
