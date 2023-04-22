import styles from "../styles/styles";
import { Ubuntu } from 'next/font/google'
import {  Navbar, Hero, Footer, Business } from "../components";

const ubuntu = Ubuntu({
	subsets: ['latin'],
	weight: "300"
})

export default function Home() {
  return (
    <main
      className={`flex bg-gray-500 min-h-screen flex-col items-center justify-between p-24 ${ubuntu.className}`}
    >
				<div className={`bg-secondary w-full overflow-hidden`}>
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
				<div className={`bg-secondary ${styles.paddingX} ${styles.flexCenter}`}>
					<Business />
				</div>
			</div>
			<Footer />
	</main>
  )
}
