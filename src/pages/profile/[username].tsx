import React from 'react';
import { AddLink, Icon } from '../../components/UI';
import { collection, where, getDocs, query } from 'firebase/firestore';
import Image from 'next/image'
import { firestore } from '../../context';

const ProfilePage = ({ data }) => {

	if (!data) {
		return null
	}

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="bg-white w-[900px] mt-10 rounded-lg">
				<div className="flex items-center justify-center pt-10 flex-col">
					<Image src={data.photo} className="rounded-full" width={96} height={96} alt="" />
					<h1 className="text-gray-800 font-semibold text-xl mt-5">{data.name}</h1>
					<h1 className="text-gray-500 text-sm">{data.location}</h1>
					<h1 className="text-gray-500 text-sm p-4 text-center">
						{data.bio}
					</h1>
			</div>
			<div className="flex justify-between p-4">
				<div>
					<h1 className="text-xs uppercase text-gray-500">Real Estate Agent</h1>
				</div>
			</div>
			<div className="flex items-center justify-center mt-3 mb-6 flex-col">
				<h1 className="text-lg text-gray-500">Get Connected</h1>
				<div className="flex mt-2 gap-4">
					{Object.keys(data.socials[0]).map((social) => {
						const socialLink = data.socials[0][social]
						return (
							<AddLink to={socialLink} target="_blank" key={socialLink}>
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

export async function getServerSideProps(context) {
	const userRef = collection(firestore, "users");
	const q = query(userRef, where("username", "==", context.params.username));
	const querySnapshot = await getDocs(q);
	let data = {};
	querySnapshot.forEach((doc) => {
		data = doc.data();
		return;
	});

  return {
    props: {
			data: JSON.parse(JSON.stringify(data))
		},
  };
}

export default ProfilePage;
