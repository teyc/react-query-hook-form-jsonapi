import 'react'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router'
import { ContactsListPage } from './ContactsListPage'
import { ContactsPage } from './ContactsPage'
import { ErrorBoundary } from 'react-error-boundary'

export const ContactsShell: FC<{}> = () => (
    <ErrorBoundary fallback={
        <div style={ { marginTop: '100px' } }>Error occurred</div>
    }>
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
    </ErrorBoundary>
)