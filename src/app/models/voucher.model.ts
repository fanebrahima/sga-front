export class Voucher {
    id?:number;
    uuid!: string;
    number!: number;
    report_number!: number;
    label!: string;
    amount!: number;
    amount_rest!: number;
    amount_paid!: number;
    voucher_type_id!: number;
    payment_type_id!: number;
    status_id!:string;
}