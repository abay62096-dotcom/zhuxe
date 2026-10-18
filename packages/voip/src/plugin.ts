import { defineWaClientPlugin } from 'zhuxe-assistance'

import type { VoipEvents } from './events.js'
import { WaVoipCoordinator, type WaVoipCoordinatorOptions } from './WaVoipCoordinator.js'

export interface VoipPluginOptions extends WaVoipCoordinatorOptions {}

/**
 * WaClient plugin that exposes {@link WaVoipCoordinator} at `client.voip`.
 *
 * @example
 * ```ts
 * import { WaClient } from 'zhuxe-assistance'
 * import { voipPlugin } from '@zhuxe-js/voip'
 *
 * const client = new WaClient({
 *   store,
 *   sessionId: 'main',
 *   plugins: [voipPlugin({ maxConcurrentCalls: 2 })]
 * })
 *
 * client.on('voip_call_incoming', (call) => {
 *   console.log('incoming', call.callId)
 * })
 * ```
 */
export function voipPlugin(options: VoipPluginOptions = {}) {
    return defineWaClientPlugin<'voip', WaVoipCoordinator, VoipEvents>({
        id: '@zhuxe-js/voip',
        exposeAs: 'voip',
        setup(ctx) {
            return new WaVoipCoordinator(ctx, options)
        },
        dispose(coordinator) {
            coordinator.dispose()
        }
    })
}
