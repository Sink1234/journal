export interface IPartResponse{
    id: string
    createdAt?: string
    updatedAt?: string

    partName?: string
    date?: string
    number?: string
    room?: string
}

export type TypePartFormState = Partial<Omit<IPartResponse, 'id' | 'updatedAt'>>

