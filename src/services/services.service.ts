import AdditionalService from "@/models/additional-service.model";
import Service from "@/models/service.model"
import axios from "axios";
import {API_URL} from '@/config'

class ServicesService {
    private API = `${API_URL}/services`

    async getServices() : Promise<Service[]> {
        
        const services: Service[] = []

        const response = await axios.get(`${this.API}`)
        
        let receivedServices = response.data
        
        for(let element of receivedServices) {
            let serviceModel = new Service();
            serviceModel.id = element.id
            serviceModel.name = element.name
            serviceModel.price = element.price
            serviceModel.description = element.description
            serviceModel.details = element.details 
            services.push(serviceModel)
        }
        
        return services
    }

    async getAdditionalServicesByServiceId(service_id: number) : Promise<AdditionalService[]> {
        const response = await axios.get(`${this.API}/${service_id}/additional_services`)
        
        let receivedAdditionalServices = response.data

        let services: AdditionalService[] = []
        
        for(let s of receivedAdditionalServices) {
            let model = new AdditionalService();
            model.id = s.id,
            model.price = s.price
            model.name = s.name
            services.push(model)
        }

        return services
    }
}

export default new ServicesService()