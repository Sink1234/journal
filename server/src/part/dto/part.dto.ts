import { IsDate, IsInt, IsOptional, IsString } from "class-validator"

export class PartDto{
    @IsString()
    @IsOptional()
    partName?: string

    @IsDate()
    @IsOptional()
    date?: Date

    @IsInt()
    @IsOptional()
    number?: number

    @IsInt()
    @IsOptional()
    room?: number
}