/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateCustomerDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsString()
    firstName: string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsString()
    lastName: string;

    

}
