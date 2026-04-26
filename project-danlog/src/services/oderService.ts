import { getApiUrl } from './laundryService';
import { Order } from '../app/NewOrderModal';

export type StatusSummary = {
    status: string;
    count: number;
    data: Order[];
}
