import { utils } from "near-api-js";

export class UsdtContract {
    constructor({ contractId, walletToUse }) {
        this.contractId = contractId;
        this.wallet = walletToUse;
    }

    async getBalanceOf(accountId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: "ft_balance_of",
            args: { account_id: accountId }
        })
    }
    async sponseUsdt(eventId, amount) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "ft_transfer_call",
            args: {receiver_id: "hkt2plats.testnet", amount, msg: eventId},
            deposit: 1,
            gas: "200000000000000"
        })
    }

    async moreSponseUsdt(eventId, amount) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: "ft_transfer_call",
            args: { receiver_id: "hkt2plats.testnet", amount, msg: eventId },
            deposit: 1,
            gas: "200000000000000"
        })
    }
}