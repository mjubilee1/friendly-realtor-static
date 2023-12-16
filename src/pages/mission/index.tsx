import React from 'react';
import { montrell } from '../../assets';
import Image from 'next/image';
import { Container } from '../../components/UI';

const MissionPage = () => {
  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Mission Statement',
      }}
      className="bg-gray-100 p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Our Mission</h1>
          <p className="text-lg text-gray-600">
            At FriendlyRealtor, we're your trusted partner on the path to homeownership. Our
            dedication is to help individuals and families turn their homeownership dreams into
            reality within the next 3-5 years.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1/4">
              <Image src={montrell} alt="Friendly Realtor Montrell" className="rounded-full" />
            </div>
            <div className="w-3/4 pl-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Montrell Jubilee, Founder & CEO
              </h2>
              <p className="text-gray-600">
                Montrell's remarkable journey began on the scenic Eastern Shore of Virginia and
                Maryland, where he spent his formative years surrounded by the beauty of nature and
                the warmth of close-knit communities. With an unwavering passion for technology and
                innovation, he embarked on his educational path, ultimately finding his way to
                Towson University, where he delved deep into the world of computer science. His
                academic pursuits not only honed his technical skills but also instilled in him a
                profound appreciation for the possibilities of the digital age.
              </p>
              <p className="text-gray-600 mt-4">
                Upon graduating, Montrell made a deliberate choice to immerse himself in the
                bustling and diverse landscape of Baltimore and Towson. Over the past four years, he
                has cultivated a rich tapestry of relationships and professional connections that
                have contributed to both his personal and career growth. His experiences have been
                instrumental in shaping FriendlyRealtor into the trusted entity it is today.
              </p>
              <p className="text-gray-600 mt-4">
                In his leisure time, Montrell enjoys the simple joys of life, cherishing moments
                with his family and friends. He's an ardent gamer, finding solace and excitement in
                the world of video games. Montrell also thrives on the energy of competitive sports,
                frequently engaging in spirited basketball and soccer matches. His life's journey is
                a testament to his dedication to growth, both as an individual and as the visionary
                behind FriendlyRealtor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MissionPage;
