import React, { useEffect, useState } from 'react';
import { AddLink, Icon } from '../../components/UI';
import { useFirebaseContext } from '../../context';
import { collection, where, getDocs, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';

const ProfilePage = () => {
	const { fireStore } = useFirebaseContext();

	const [profile, setProfile] = useState(); 

	useEffect(() => {
	 const getProfileData = async () => {
		if (fireStore && location.pathname) {
			const profileName = location.pathname.split('/profile/')[1]
			const userRef = collection(fireStore, "users");
			const q = query(userRef, where("username", "==", profileName));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setProfile(doc.data())
			});
			}
		}

		getProfileData()
	}, [fireStore])


	if (!profile) {
		return <div />
	}

	return (
		<div class="h-screen flex items-center justify-center">
			<div class="bg-white w-[900px] mt-10 rounded-lg">
				<div class="flex items-center justify-center pt-10 flex-col">
					<img src={profile.photo} class="rounded-full w-32" />
					<h1 class="text-gray-800 font-semibold text-xl mt-5">{profile.name}</h1>
					<h1 class="text-gray-500 text-sm">{profile.location}</h1>
					<h1 class="text-gray-500 text-sm p-4 text-center">
						{profile.bio}
					</h1>
			</div>
			<div class="flex justify-between p-4">
				<div>
					<h1 class="text-xs uppercase text-gray-500">Real Estate Agent</h1>
				</div>
			</div>
			<div class="flex items-center justify-center mt-3 mb-6 flex-col">
				<h1 class="text-lg text-gray-500">Get Connected</h1>
				<div class="flex mt-2 gap-4">
					{Object.keys(profile.socials[0]).map((social) => {
						const socialLink = profile.socials[0][social]
						return (
							<AddLink to={socialLink} target="_blank">
								<Icon name={social} size="large" color="black" />
							</AddLink>
						)
					})}
				</div>
			</div>
		</div>
	</div>
  )
}

export default ProfilePage;
