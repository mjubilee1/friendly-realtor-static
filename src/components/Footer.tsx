import styles from '../styles/styles';
import { logo } from '../assets';
import { footerLinks, socialMedia } from '../constants';
import Image from 'next/image';

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col w-full`}>
      {footerLinks.map((footerlink) => (
        <ul className="flex w-full justify-between">
          {footerlink.links.map((link, index) => {
            return (
              <li
                key={link.name}
                className={`font-ubuntu font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                  index !== footerlink.links.length - 1 ? 'mb-4' : 'mb-0'
                }`}
              >
                <a
                  href={link.href}
                  target={link.name === 'Sitemap' || 'Blogs' ? '_self' : '_blank'}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      ))}

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-ubuntu font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2023 JubileeInvestments LLC. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <Image
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
      <div className="w-full text-xs">100 E Redwood St, Baltimore, MD, United States, 21212</div>
    </section>
  );
};

export default Footer;
