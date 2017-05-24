import {EventArgsDto} from './EventArgsDto';

export interface EventDelegate {
    (args:EventArgsDto): void
}
