import React from 'react';
import { friendlyrealtor } from '../assets';
import { Button } from './UI';
import Image from 'next/image';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    fbEvent('download_btn_click', {
      content_name: 'download_now_btn',
      content_category: 'user_interaction',
      value: 1,
    });

    gtagEvent({
      action: 'download_btn_click',
      category: 'user_interaction',
      label: 'download_now_btn',
      value: 1,
    });

    router.push('https://apps.apple.com/us/app/friendlyrealtor/id6446328944');
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="flex-1 flex flex-col md:h-full">
        <div>
          <Button color="secondary" onClick={handleClick} className="py-4 mb-4">
            Download Mobile App
          </Button>
        </div>
        <div className="md:mb-6 text-4xl md:text-6xl font-light mb-6">
          Empowering Realtors Together
        </div>
        <div className="mb-4">
          Embark on a seamless realtor empowerment journey with our innovative platform. Experience
          the benefits of our free event hosting feature, effortlessly connecting with attendees.
          Simplifying event coordination and prioritizing local connections, the Event Center
          catalyzes trust, fostering a community where networking transforms real estate success.
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <Image
          src={friendlyrealtor}
          alt="friendly_realtor_image"
          className="w-full md:w-[40rem] h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
