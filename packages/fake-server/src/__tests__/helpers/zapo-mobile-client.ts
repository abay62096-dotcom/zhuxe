import { createNoopLogger, createStore, type Logger, WaClient } from 'zhuxe-assistance'

import { type FakeMobilePrimary, seedFakeMobilePrimary } from '../../api/FakeMobilePrimary'
import type { FakeWaServer } from '../../api/FakeWaServer'

const NOOP_LOGGER: Logger = createNoopLogger('error')

export interface CreateZhuxeMobileClientOptions {
    readonly sessionId?: string
    readonly phoneNumber?: string
    readonly lidUser?: string
    readonly pushName?: string
    readonly connectTimeoutMs?: number
    readonly logger?: Logger
}

export interface ZhuxeMobileClientFixture {
    readonly client: WaClient
    readonly primary: FakeMobilePrimary
}

/**
 * Builds a client that connects as a registered mobile primary: credentials are
 * seeded into the store up front (registration happens out of band) and the
 * transport dials the server's raw-TCP listener, so the server must be started
 * with `{ tcp: true }`.
 */
export async function createZhuxeMobileClient(
    server: FakeWaServer,
    options: CreateZhuxeMobileClientOptions = {}
): Promise<ZhuxeMobileClientFixture> {
    const store = createStore({})
    const sessionId = options.sessionId ?? 'fake-server-mobile-cross-check'
    const primary = await seedFakeMobilePrimary(store, sessionId, {
        phoneNumber: options.phoneNumber ?? '5511999999999',
        ...(options.lidUser ? { lidUser: options.lidUser } : {}),
        ...(options.pushName ? { pushName: options.pushName } : {})
    })

    const client = new WaClient(
        {
            store,
            sessionId,
            mobileTransport: {
                deviceInfo: primary.deviceInfo,
                tcpUrl: server.tcpUrl
            },
            connectTimeoutMs: options.connectTimeoutMs ?? 60_000,
            proxy: {
                mediaUpload: server.mediaProxyAgent,
                mediaDownload: server.mediaProxyAgent
            },
            testHooks: {
                noiseRootCa: server.noiseRootCa
            }
        },
        options.logger ?? NOOP_LOGGER
    )

    return { client, primary }
}
