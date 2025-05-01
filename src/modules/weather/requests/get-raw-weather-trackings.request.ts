import { Type } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsString } from "class-validator";
import { IsAfterOrEqual } from "src/common/validators";

export class GetRawWeatherTrackingsRequest {
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    city: string;

    @IsISO8601()
    @IsNotEmpty()
    @Type(() => String)
    from: string;

    @IsISO8601()
    @IsAfterOrEqual("from")
    @IsNotEmpty()
    @Type(() => String)
    to: string;
}