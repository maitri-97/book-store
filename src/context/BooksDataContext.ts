import { createContext, SetStateAction, Dispatch } from "react";
import { BookDetailsDataType } from "../types";


type BooksDataContextType = {
    data: BookDetailsDataType[] | [];
    setData: Dispatch<SetStateAction<BookDetailsDataType[]>>
}

export const BooksDataContext = createContext<BooksDataContextType>(null!);