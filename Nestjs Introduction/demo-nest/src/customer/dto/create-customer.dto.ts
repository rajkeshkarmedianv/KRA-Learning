/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCustomerDto {
     
    @ApiProperty({ example: 'Raj' })
    @IsString()
    firstName: string;

    
     @ApiProperty({ example: 'keshkar' })
    @IsString()
    lastName: string;

    

}
