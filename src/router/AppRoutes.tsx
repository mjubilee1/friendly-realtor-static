import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const ProfileView = lazy(() => import('../pages/profile'));
const NotFound404View = lazy(() => import('../pages/404'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Suspense fallback={<div />}>
            <NotFound404View />
          </Suspense>
        }
      />
      <Route
        path="profile/*"
        element={
          <Suspense fallback={<div />}>
            <ProfileView />
          </Suspense>
        }
      />
    </Routes>
  );
}
