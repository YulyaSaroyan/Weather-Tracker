import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class AddCityRequest {
    @IsString()
    @IsNotEmpty()
    city: string;
}