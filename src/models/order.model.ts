import AdditionalService from "./additional-service.model"
import Service from "./service.model"

export class ServiceInfo {
    id: number = 0
    price: number = 0
    name: string = ""
}

export class ClientInfo {
    first_name: string = ""
    last_name: string = ""
    middle_name: string = ""
    phone: string = ""
}

export class PremisesInfo {
    area: number = 0
    address: string = ""
    premises_type: number = 1
}

export class AddtionalServiceInfo  {
    id: number = 0
    price: number = 0
    name: string = ""
}

export default class Order {
    id: number = 0
    sum: number = 0
    status: number = 1
    service: ServiceInfo = new ServiceInfo()
    client: ClientInfo = new ClientInfo()
    premises: PremisesInfo = new PremisesInfo()
    additnal_services: AddtionalServiceInfo[] = []
}