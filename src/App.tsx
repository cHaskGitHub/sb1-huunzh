import React, { useState, useEffect } from 'react'
import { Palette } from 'lucide-react'

function App() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [showAd, setShowAd] = useState(false)
  const [adTimer, setAdTimer] = useState(30)

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan']
  const adImageUrl = 'https://firebasestorage.googleapis.com/v0/b/dashbor-09dndd.appspot.com/o/Amazon%E3%82%BB%E3%83%BC%E3%83%AB.jpg?alt=media&token=0d71b166-6814-4d0d-a32c-0ab9ece375c0'
  const adLinkUrl = 'https://www.amazon.co.jp?&linkCode=ll2&tag=chask555-22&linkId=059df6341cb2f4d4c145d83b2eeae390&language=ja_JP&ref_=as_li_ss_tl'

  useEffect(() => {
    let interval: number | undefined
    if (showAd && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer((prev) => prev - 1)
      }, 1000)
    } else if (adTimer === 0) {
      setShowAd(false)
    }
    return () => clearInterval(interval)
  }, [showAd, adTimer])

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setShowAd(true)
    setAdTimer(30)
  }

  const handleAdClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open(adLinkUrl, '_blank', 'noopener,noreferrer')
    // Fallback for when popup is blocked
    setTimeout(() => {
      window.location.href = adLinkUrl
    }, 100)
  }

  if (selectedColor && !showAd) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: selectedColor }}
      >
        <button
          onClick={() => setSelectedColor(null)}
          className="absolute top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Palette className="mr-2" /> Penlight App
      </h1>
      {showAd ? (
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Advertisement</h2>
          <a href={adLinkUrl} onClick={handleAdClick} className="block mb-4">
            <img src={adImageUrl} alt="Advertisement" className="w-full h-auto" />
          </a>
          <p className="text-xl font-bold">{adTimer} seconds remaining</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className="w-32 h-32 rounded-full shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App