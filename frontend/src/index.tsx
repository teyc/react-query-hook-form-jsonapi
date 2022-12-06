import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./index.css";
import Root from './Root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContactsListPage, ContactsPage } from './contacts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const reactQueryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="" element={<App />} />
            <Route path="contacts/" element={<ContactsListPage />} />
            <Route path="contacts/:contactId" element={<ContactsPage id={1} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
