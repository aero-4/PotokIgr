import React, {useState, useEffect} from 'react'
import upPng from '../assets/up.png'


function UpButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.pageYOffset > 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <button
            onClick={scrollToTop}
            className={`
                        small_buttons rounded-full fixed bottom-4 left-4 z-50
                        transition-opacity duration-300
                        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                      `}
            aria-label="Scroll to top"
        >
            <img src={upPng} alt="Up" className="w-8 h-8"/>
        </button>
    )
}

export default UpButton
