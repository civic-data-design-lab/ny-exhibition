import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import twitterDefaultImgUrl from '../../assets/meta_twitter.jpg'
import ogDefaultImgUrl from '../../assets/meta_og.jpg'
import { clickedCellState } from '../../state'
import { useRecoilValue } from 'recoil'
import { getOgImage } from '../../lib/data-utils'

export const Meta = () => {
  const location = useLocation()
  const cell = useRecoilValue(clickedCellState)
  const [ogImage, setOgImage] = useState(ogDefaultImgUrl)
  const [twitterImage, setTwitterImage] = useState(twitterDefaultImgUrl)

  const [url, setUrl] = useState(null)

  const updateUrl = () => {
    setUrl(window.location.href)
  }

  const updateImages = () => {
    let _ogImage = ogDefaultImgUrl
    let _twitterImage = twitterDefaultImgUrl

    if (cell) {
      const url = getOgImage(cell)
      _ogImage = url
      _twitterImage = url
    }

    setOgImage(_ogImage)
    setTwitterImage(_twitterImage)
  }

  useEffect(updateUrl, [location])
  useEffect(updateImages, [cell])

  return (
    <Helmet>
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${ogImage}?cachebust=12345`} />
      <meta name="twitter:image" content={twitterImage} />
    </Helmet>
  )
}
