import { IPartResponse, TypePartFormState } from "@/types/part.types"
import { axiosWithAuth } from "../interceptors"

class PartService {
    private BASE_URL = '/user/parts'

    async getPart() {
        const response = await axiosWithAuth.get<IPartResponse>(this.BASE_URL)
        return response
    }

    async createPart(data: TypePartFormState) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response
    }

    async updatePart(id:string ,data:  TypePartFormState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
        return response
    }

    async deletePart(id:string ) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response
    }
}

export const partService = new PartService()