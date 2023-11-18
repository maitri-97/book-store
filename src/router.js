import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Statistics from "./pages/dashboard/components/statistics";
import EditBookDetails from "./pages/dashboard/components/edit-book-details";
import BookDetails from "./pages/dashboard/components/book-details";
import App from "./App";
import BooksList from "./pages/dashboard/components/books-list";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/" element={<Statistics />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="edit-book-details/:id" element={<EditBookDetails />} />
        <Route path="book-details/:id" element={<BookDetails />} />
        <Route path="books-list" element={<BooksList />} />
        <Route path="books-list/author/:author" element={<BooksList />} />
        <Route path="books-list/seller/:seller" element={<BooksList />} />
        <Route path="favourites" element={<BooksList />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </>
  )
);
