export class Repair {
    id?:number;
    repairer_id!:number;
    vehicle_id!:number;
    shock_point_id!:number;
    point_of_shock!:string;
    remark!:string;
    amount!:number;
    works!:any;
    shock_points!:any;
    emails!:any;
    expert_email!:string;
    repairer_email!:string;
    customer_email!:string;
    insured_email!:string;
    expert_signature!:any;
    repairer_signature!:any;
    customer_signature!:any;

    client_name!:string;
    client_phone!:string;
    client_email!:string;

    insurer_name!:string;
    insurer_phone!:string;
    insurer_email!:string;

    disaster_number!:string;
}
