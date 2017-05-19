import {EventMethodEnum} from "./EventMethodEnum";
import {EventComponentTypeEnum} from "./EventComponentTypeEnum";
export interface EventArgsDto{
    event:EventMethodEnum,
    value:any,
    name:string,
    type:EventComponentTypeEnum
    props?:any
}