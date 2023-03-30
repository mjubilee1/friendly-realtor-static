import React, { lazy, Suspense } from 'react';
import styles from "./style";
import { Billing, Business, CardDeal, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import { FirebaseProvider } from './context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/profile';

const NotFound404 = lazy(() => import('./pages/404'));

const App = () => {
	return <FirebaseProvider>
		<BrowserRouter>
			<div className={`bg-secondary w-full overflow-hidden`}>
					<div className={`${styles.paddingX} ${styles.flexCenter}`}>
						<div className={`${styles.boxWidth}`}>
							<Navbar />
						</div>
					</div>

					{window.location.pathname === "/" &&
					<div className={`bg-secondary ${styles.flexStart}`}>
						<div className={`${styles.boxWidth}`}>
							<Hero />
						</div>
					</div>}
				<div className={`bg-secondary ${styles.paddingX} ${styles.flexCenter}`}>
				<Routes>
					<Route
						path="*"
						element={<NotFound404 />}
					/>
					<Route
						path="profile/*"
						element={<ProfilePage />}
					/>
					<Route
						path="/"
						element={
							<Suspense>
								<div className={`${styles.boxWidth}`}>
									<Business />
									{/*<Testimonials />*/}
									<Footer />
								</div>
							</Suspense>
						}
					/>
				</Routes>
				</div>
			</div>
		</BrowserRouter>
	</FirebaseProvider>
};

export default App;