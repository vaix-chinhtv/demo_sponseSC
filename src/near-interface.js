/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
import { utils } from "near-api-js";

export class NearContract {
    constructor({ contractId, walletToUse }) {
        this.contractId = contractId;
        this.wallet = walletToUse;
    }

    //call_methods
    async createEvent(eventId, nameEvent) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "create_event",
            args: {event_id: eventId, name_event: nameEvent},
            deposit: 1
        })
    }

    async sponseNative(eventId, amount) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "sponse_native",
            args: {event_id: eventId, amount},
            deposit: amount
        })
    }

    async moreSponseNative(eventId, amount) {
       return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "more_sponse_native",
            args: { event_id: eventId, amount },
            deposit: amount
        })
    }

    async claim(eventId) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "claim",
            args: { eventId},
            deposit: 1
        })
    }

    async finishEvent(eventId) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "finish_event",
            args: { eventId },
        })
    }

    async cancelEvent(eventId) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "cancel_events",
            args: {eventId},
            deposit:1
        })
    }

    async getAllEventClient() {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "get_all_event_client",
            args: {},
        });
    }

    async getSponsed() {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "get_sponsed",
            args: {},
        });
    }

    // view_methods
    async getAllEvents() {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "get_all_events",
            args: {},
        });
    }

    async getAllActiveEvents() {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "get_all_active_events",
            args: {},
        });
    }

    async getAllUnActiveEvents() {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "get_all_unactive_events",
            args: {},
        });
    }

    async getAllSponserEvent(eventId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "get_all_sponser_event",
            args: {event_id: eventId},
        });
    }


    async getTotalTokenEvent(eventId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "get_total_token_event",
            args: {event_id: eventId},
        });
    }


    async getDetailEvent(eventId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "watch_detail_event",
            args: { event_id: eventId },
        });
    }
}