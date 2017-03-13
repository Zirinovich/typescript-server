export interface IStarsAction {
    type: string;
    payload?: {
        count?: number;
        message?: any;
    };
}
