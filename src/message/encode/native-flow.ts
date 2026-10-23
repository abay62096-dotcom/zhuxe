import type { WaInteractiveButton, WaSendInteractiveMessage } from '@message/types'
import type { Proto } from '@proto'

/**
 * Helper untuk membangun tombol native flow. Semua tipe tombol
 * dibungkus sebagai `{ name, buttonParamsJson }` dan nanti
 * dirender sebagai `<biz><interactive><native_flow/></interactive></biz>`
 * oleh `buildButtonAddonNode`.
 */
export const NativeFlow = Object.freeze({
    quickReply(displayText: string, id: string): WaInteractiveButton {
        return {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: displayText, id })
        }
    },
    url(displayText: string, url: string): WaInteractiveButton {
        return {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: displayText,
                url,
                merchant_url: url
            })
        }
    },
    call(displayText: string, phoneNumber: string): WaInteractiveButton {
        return {
            name: 'cta_call',
            buttonParamsJson: JSON.stringify({
                display_text: displayText,
                phone_number: phoneNumber
            })
        }
    },
    copy(displayText: string, copyCode: string): WaInteractiveButton {
        return {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
                display_text: displayText,
                copy_code: copyCode
            })
        }
    },
    singleSelect(title: string, sections: readonly unknown[]): WaInteractiveButton {
        return {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({ title, sections })
        }
    }
})

export function isSendInteractiveMessage(
    content: unknown
): content is WaSendInteractiveMessage {
    return (
        !!content &&
        typeof content === 'object' &&
        'type' in content &&
        (content as { type: unknown }).type === 'interactive' &&
        'text' in content &&
        'buttons' in content
    )
}

/**
 * Bungkus `WaSendInteractiveMessage` menjadi `Proto.IMessage` dengan
 * `interactiveMessage.nativeFlowMessage`. Node `<biz>` akan ditambahkan
 * otomatis oleh `WaMessageDispatchCoordinator` karena
 * `resolveButtonAddonKind()` mendeteksi `nativeFlowMessage`.
 */
export function buildInteractiveMessageContent(
    content: WaSendInteractiveMessage
): Proto.IMessage {
    if (content.buttons.length === 0) {
        throw new Error('interactive message requires at least one button')
    }
    const interactiveMessage: Proto.Message.IInteractiveMessage = {
        body: { text: content.text },
        nativeFlowMessage: {
            buttons: content.buttons.map((b) => ({
                name: b.name,
                buttonParamsJson: b.buttonParamsJson
            }))
        }
    }
    if (content.title) {
        interactiveMessage.header = {
            title: content.title,
            hasMediaAttachment: false
        }
    }
    if (content.footer) {
        interactiveMessage.footer = { text: content.footer }
    }
    return { interactiveMessage }
}
