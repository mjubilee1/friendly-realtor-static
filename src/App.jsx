import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import { FirebaseProvider } from './context';

const App = () => {

	return <FirebaseProvider>
		<div className="bg-primary w-full overflow-hidden">
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Navbar />
				</div>
			</div>

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>
			<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Stats />
					<Business />
					<Billing />
					<CardDeal />
					<Testimonials />
					<CTA />
					<Footer />
				</div>
			</div>
		</div>
	</FirebaseProvider>
};

export default App;