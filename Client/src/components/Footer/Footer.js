import React from 'react'
import styles from './Footer.module.css'
import aiaPng from '../../assets/01_AIANewYork_Logo_Black.png'
import cfaPng from '../../assets/02_CenterForArch_Logo_Black.png'
import cddlPng from '../../assets/03_CDDL_Logo_Black.png'

const promoters = [
  {
    link: { href: 'http://example.com', title: 'Go to: AIA New York website' },
    img: { src: aiaPng, alt: 'AIA logo' },
  },
  {
    link: { href: 'http://example.com', title: 'Go to: Center for Architecture website' },
    img: { src: cfaPng, alt: 'Center for Architecture logo' },
  },
  {
    link: { href: 'http://example.com', title: 'Go to: CDDL website' },
    img: { src: cddlPng, alt: 'CDDL logo' },
  },
]

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {promoters.map(({ link, img }, i) => {
        return (
          <a
            key={i}
            className={styles.logo}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            title={link.title}
          >
            <img src={img.src} alt={img.alt} />
          </a>
        )
      })}
    </footer>
  )
}
