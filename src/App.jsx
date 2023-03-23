import React, { lazy, Suspense } from 'react';
import styles from "./style";
import { Billing, Business, CardDeal, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import { FirebaseProvider } from './context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const NotFound404 = lazy(() => import('./pages/404'));

const App = () => {
	return <FirebaseProvider>
		<BrowserRouter>
			<div className={`bg-secondary w-full overflow-hidden`}>
				{window.location.pathname === "/" &&
				<div>
					<div className={`${styles.paddingX} ${styles.flexCenter}`}>
						<div className={`${styles.boxWidth}`}>
							<Navbar />
						</div>
					</div>

					<div className={`bg-secondary ${styles.flexStart}`}>
						<div className={`${styles.boxWidth}`}>
							<Hero />
						</div>
					</div>
				</div>}
				<div className={`bg-secondary ${styles.paddingX} ${styles.flexCenter}`}>
				<Routes>
					<Route
						path="*"
						element={<NotFound404 />}
					/>
					<Route
						path="/"
						element={
							<Suspense>
								<div className={`${styles.boxWidth}`}>
									<Stats />
									<Business />
									<Billing />
									<CardDeal />
									<Testimonials />
									<CTA />
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