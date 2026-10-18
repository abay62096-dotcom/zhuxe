import { createNoopLogger, createStore, type Logger, WaClient } from 'zhuxe-assistance'

const NOOP_LOGGER: Logger = createNoopLogger('error')

import type { FakeWaServer } from '../../api/FakeWaServer'

export interface CreateZhuxeClientOptions {
    readonly sessionId?: string
    readonly connectTimeoutMs?: number
    readonly historySyncEnabled?: boolean
    readonly emitSnapshotMutations?: boolean
    readonly logger?: Logger
}

export interface ZhuxeClientFixture {
    readonly client: WaClient
}

export function createZhuxeClient(
    server: FakeWaServer,
    options: CreateZhuxeClientOptions = {}
): ZhuxeClientFixture {
    const store = createStore({})

    const client = new WaClient(
        {
            store,
            sessionId: options.sessionId ?? 'fake-server-cross-check',
            chatSocketUrls: [server.url],
            connectTimeoutMs: options.connectTimeoutMs ?? 60_000,
            history: options.historySyncEnabled ? { enabled: true } : undefined,
            chatEvents: options.emitSnapshotMutations ? { emitSnapshotMutations: true } : undefined,
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

    return { client }
}
