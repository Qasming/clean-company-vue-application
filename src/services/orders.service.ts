import authService from "./auth.service"
import authHeader from "@/headers/auth.header"
import Order from "@/models/order.model"
import axios from "axios"
import { API_URL } from '@/config'
import Service from "@/models/service.model"

export class CreateOrderDto {
    public service_id: number = 0
    public address: string = ""
    public area: number = 0
    public premisesType: number = 1
    public additionalServices: Array<number> = []
    public clietFirstName: string = ""
    public clientLastName: string = ""
    public clientMiddleName: string = ""
    public phone: string = ""
}

class OrdersService {
    private API = `${API_URL}/orders`

    async createOrder(data: CreateOrderDto) : Promise<number> {
        let apiObject = {
            service_id: data.service_id,
            address: data.address,
            area: data.area,
            additional_services: [...data.additionalServices],
            premises_type: data.premisesType,
            client_first_name: data.clietFirstName,
            client_last_name: data.clientLastName,
            client_middle_name: data.clientMiddleName,
            phone: data.phone
        }
        const response = await axios.post(`${this.API}`, apiObject,{
            headers: authHeader()
        })
        return response.data.id
    }
    
    async getOrderById(order_id: number) : Promise<Order> {
        const response = await axios.get(`${this.API}/${order_id}`, {
            headers: authHeader()
        })
        
        let additional_services = response.data.additional_services

        const order = new Order()

        order.id = response.data.id

        order.sum = response.data.sum

        order.status = response.data.status

        let premises_info = response.data.premises_info

        order.premises.address = premises_info.address

        order.premises.area = premises_info.area
        
        order.premises.premises_type = premises_info.premises_type

        let client_info = response.data.client_info

        order.client.first_name = client_info.first_name
        
        order.client.last_name = client_info.last_name
        
        order.client.middle_name = client_info.middle_name
        
        order.client.phone = client_info.phone


        let service_info = response.data.service_info

        order.service.id = service_info.id

        order.service.name = service_info.name 

        order.service.price = service_info.price



        for(let additional_service of additional_services) {
            order.additnal_services.push({
                id: additional_service.id,
                name: additional_service.name,
                price: additional_service.price
            })
        }

        return order
    }

    async completeOrder(order_id: number) : Promise<Order> {
        const response = await axios.put(`${this.API}/${order_id}`, {
            // headers: authHeader(),
            action: "complete"
        })
        
        let additional_services = response.data.additional_services

        const order = new Order()

        order.id = response.data.id

        order.sum = response.data.sum

        order.status = response.data.status

        let premises_info = response.data.premises_info

        order.premises.address = premises_info.address

        order.premises.area = premises_info.area
        
        order.premises.premises_type = premises_info.premises_type

        let client_info = response.data.client_info

        order.client.first_name = client_info.first_name
        
        order.client.last_name = client_info.last_name
        
        order.client.middle_name = client_info.middle_name
        
        order.client.phone = client_info.phone


        let service_info = response.data.service_info

        order.service.id = service_info.id

        order.service.name = service_info.name 

        order.service.price = service_info.price



        for(let additional_service of additional_services) {
            order.additnal_services.push({
                id: additional_service.id,
                name: additional_service.name,
                price: additional_service.price
            })
        }

        return order
    }

    async cancelOrder(order_id: number) : Promise<Order> {
        const response = await axios.put(`${this.API}/${order_id}`, {
            // headers: authHeader(),
            action: "cancel"
        })
        
        let additional_services = response.data.additional_services

        const order = new Order()

        order.id = response.data.id

        order.sum = response.data.sum

        order.status = response.data.status

        let premises_info = response.data.premises_info

        order.premises.address = premises_info.address

        order.premises.area = premises_info.area
        
        order.premises.premises_type = premises_info.premises_type

        let client_info = response.data.client_info

        order.client.first_name = client_info.first_name
        
        order.client.last_name = client_info.last_name
        
        order.client.middle_name = client_info.middle_name
        
        order.client.phone = client_info.phone


        let service_info = response.data.service_info

        order.service.id = service_info.id

        order.service.name = service_info.name 

        order.service.price = service_info.price


        for(let additional_service of additional_services) {
            order.additnal_services.push({
                id: additional_service.id,
                name: additional_service.name,
                price: additional_service.price
            })
        }

        return order
    } 

    async getOrders() : Promise<Order[]> {
        const response = await axios.get(`${this.API}`, {
            headers: authHeader()
        })

        const orders: Order[] = []

        for(let _order of response.data) {
            let additional_services = _order.additional_services

            const order = new Order()
    
            order.id = _order.id
    
            order.sum = _order.sum
    
            order.status = _order.status
    
            let premises_info = _order.premises_info
    
            order.premises.address = premises_info.address
    
            order.premises.area = premises_info.area
            
            order.premises.premises_type = premises_info.premises_type
    
            let client_info = _order.client_info
    
            order.client.first_name = client_info.first_name
            
            order.client.last_name = client_info.last_name
            
            order.client.middle_name = client_info.middle_name
            
            order.client.phone = client_info.phone
    
    
            let service_info = _order.service_info
    
            order.service.id = service_info.id
    
            order.service.name = service_info.name 
    
            order.service.price = service_info.price
    
    
            for(let additional_service of additional_services) {
                order.additnal_services.push({
                    id: additional_service.id,
                    name: additional_service.name,
                    price: additional_service.price
                })
            }

            orders.push(order)
        }

        return orders
    }
}

export default new OrdersService()