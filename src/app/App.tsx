import { useState, useEffect } from 'react'
import NetherPortalScene from '../components/NetherPortalScene'
import PortalTransition from '../components/PortalTransition'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import InventorySection from '../components/InventorySection'
import QuestLogSection from '../components/QuestLogSection'
import MinecraftFooter from '../components/MinecraftFooter'


function App() {
    const [hasEntered, setHasEntered] = useState<boolean>(false)
    const [isZooming, setIsZooming] = useState<boolean>(false)

    useEffect(() => {
        if (hasEntered) {
            // Setelah masuk (hasEntered true), kita matikan isZooming
            // Ini akan memicu transisi opacity PortalTransition menjadi 0 (fade out)
            // Sehingga halaman baru terlihat perlahan dari balik 'kabut' portal
            setIsZooming(false)
        }
    }, [hasEntered])

    return (
        <>
            {/* PortalTransition diletakkan di level paling atas agar tetap ada saat pergantian scene */}
            <PortalTransition isZooming={isZooming} />

            {!hasEntered ? (
                <NetherPortalScene
                    onEnter={() => setHasEntered(true)}
                    isZooming={isZooming}
                    setIsZooming={setIsZooming}
                />
            ) : (
                <>
                    <HeroSection />
                    <AboutSection />
                    <InventorySection />
                    <QuestLogSection />
                    <MinecraftFooter/>
                </>
            )}
        </>
    )
}

export default App
