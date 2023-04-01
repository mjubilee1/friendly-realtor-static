import React from 'react';
import { AddLink, Icon } from '../../components/UI';

const ProfilePage = () => {
  return (
		<div class="h-screen flex items-center justify-center">
			<div class="bg-white w-4/5 mt-10 rounded-lg">
				<div class="flex items-center justify-center pt-10 flex-col">
					<img src="https://i.pinimg.com/originals/a8/bc/90/a8bc90ea196737604770aaf9c2d56a51.jpg" class="rounded-full w-32" />
					<h1 class="text-gray-800 font-semibold text-xl mt-5">Bae Suzy</h1>
					<h1 class="text-gray-500 text-sm">Seoul, South Korea</h1>
					<h1 class="text-gray-500 text-sm p-4 text-center">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
					<AddLink to="/" target="_blank">
						<Icon name="facebook" size="large" />
					</AddLink>
					<AddLink to="/" target="_blank">
						<Icon name="instagram" size="large" />
					</AddLink>
					<AddLink to="/" target="_blank">
						<Icon name="linkedin" size="large" />
					</AddLink>
				</div>
			</div>
		</div>
	</div>
  )
}

export default ProfilePage;