import { Dispatch, SetStateAction } from "react";


type BuyLinks = {
    name: '',
    url: 'string'
}
export interface BookDetailsDataType {
    title: string;
    book_image: string;
    author: string;
    rank: number;
    price: number;
    fav: boolean;
    id: number;
    rating: number;
    list_name_encoded: string;
    description: 'string';
    publisher: 'string';
    buy_links: BuyLinks[];
}

export interface AlertDataType {
    type?: string;
    message: string;
    show: boolean;
    setShow?: Dispatch<SetStateAction<boolean>>;
    cancelBtnText?: string;
    actionBtnText?: string;
    actionBtnClick?: () => void;
}

