import { useState, useEffect, Suspense, lazy } from 'react'
import NetherPortalScene from '../components/NetherPortalScene'
import PortalTransition from '../components/PortalTransition'

const HeroSection = lazy(() => import('../components/HeroSection'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const InventorySection = lazy(() => import('../components/InventorySection'));
const QuestLogSection = lazy(() => import('../components/QuestLogSection'));
const MinecraftFooter = lazy(() => import('../components/MinecraftFooter'));


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

    // Sync hasEntered with browser URL: default '/' for nether, '/nafhan' after entering
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // On mount, if URL already /nafhan, set entered
        if (window.location.pathname === '/nafhan') {
            setHasEntered(true)
            // ensure no extra history entry on load
            window.history.replaceState({}, '', '/nafhan')
        } else {
            // ensure base path is '/'
            window.history.replaceState({}, '', '/')
        }

        const onPop = () => {
            // When user navigates browser history, reflect pathname into state
            setHasEntered(window.location.pathname === '/nafhan')
        }

        window.addEventListener('popstate', onPop)
        return () => window.removeEventListener('popstate', onPop)
    }, [])

    // push/replace history when hasEntered changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (hasEntered) {
            // push a new state so back button returns to '/'
            window.history.pushState({}, '', '/nafhan')
        } else {
            window.history.pushState({}, '', '/')
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
                <Suspense fallback={<div style={{color:'white', textAlign:'center', paddingTop:'20%'}}>Loading World...</div>}>
                    <HeroSection />
                    <AboutSection />
                    <InventorySection />
                    <QuestLogSection />
                    <MinecraftFooter/>
                </Suspense>
            )}
        </>
    )
}

export default App
