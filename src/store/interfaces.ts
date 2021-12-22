import Order from '@/models/order.model';
import Service from '@/models/service.model';
import User from '@/models/user.model'


export interface State {
    user: User | undefined,
}

export interface LoginDto {
    phone: string
    code: string
}

export interface SendCodeToPhoneDto {
    phone: string
}