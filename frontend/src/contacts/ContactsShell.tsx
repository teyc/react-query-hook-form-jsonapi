import 'react'
import React, { FC } from 'react'
import { Outlet, Route, Routes } from 'react-router';
import { ContactsListPage } from './ContactsListPage';
import { ContactsPage } from './ContactsPage';

export const ContactsShell: FC<{}> = () => (
    <React.Suspense fallback={
        <div style={{ marginTop: '100px' }}>
            Loading data ...
        </div>
    }>
        <Routes>
            <Route path="" element={<ContactsListPage />} />
            <Route path=":contactId" element={<ContactsPage />} />
        </Routes>
    </React.Suspense>
)