export interface Depends {
    [prop: string]: string[];
}

export interface Prop {
    type: Number | String | Object | Boolean | Function;
    value: any;
    depends?: Depends;
    builInValues?: string[];
}

export interface Props {
    [name: string]: Prop;
}

export interface StandartComponent {
    props: Props;
    children?: string[] | null | number;
    namespace?: string[];
}

export interface IStandartComponents {
    [name: string]: StandartComponent;
}