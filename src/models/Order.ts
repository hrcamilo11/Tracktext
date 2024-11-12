import {Document, model, Schema} from 'mongoose';

export interface IOrder extends Document {
    _id: string;
    client: string;
    product: string;
    size: string;
    reference: number;
    quantity: number;
    dueDate: string;
    deliveredDate: string;
    status: string;
    progress: {
        [key: string]: {
            completed: number;
        };
    };
}

const OrderSchema = new Schema<IOrder>({
    client: {type: String, required: true},
    product: {type: String, required: true},
    size: {type: String, required: true},
    reference: {type: Number, required: true},
    quantity: {type: Number, required: true},
    dueDate: {type: String, required: true},
    deliveredDate: {type: String, required: false},
    status: {type: String, required: true},
    progress: {
        type: Map,
        of: new Schema({
            completed: {type: Number, required: true}
        }),
        required: false
    },
});

export const Order = model<IOrder>('Order', OrderSchema);