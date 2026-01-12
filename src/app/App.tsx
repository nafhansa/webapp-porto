import { useState, useEffect, Suspense, lazy } from 'react'
import PortalTransition from '../components/PortalTransition'
import MapNav from '../components/MapNav'

const NetherPortalScene = lazy(() => import('../components/NetherPortalScene'));
const HeroSection = lazy(() => import('../components/HeroSection'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const InventorySection = lazy(() => import('../components/InventorySection'));
const TimeTravelSection = lazy(() => import('../components/TimeTravelSection'));
const QuestLogSection = lazy(() => import('../components/QuestLogSection'));
const MinecraftFooter = lazy(() => import('../components/MinecraftFooter'));


function App() {
    const [hasEntered, setHasEntered] = useState<boolean>(false)
    const [isZooming, setIsZooming] = useState<boolean>(false)
    const [hasEnteredFuture, setHasEnteredFuture] = useState<boolean>(false)

    useEffect(() => {
        if (hasEntered) {
            setIsZooming(false)
        }
    }, [hasEntered])

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const pathname = window.location.pathname;

        if (pathname === '/nafhan') {
            setHasEntered(true)
            window.history.replaceState({}, '', '/nafhan')
        } else {
            window.history.replaceState({}, '', '/')
        }

        const onPop = () => {
            const currentPath = window.location.pathname;
            setHasEntered(currentPath === '/nafhan')
        }

        window.addEventListener('popstate', onPop)
        return () => window.removeEventListener('popstate', onPop)
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (hasEntered) {
            window.history.pushState({}, '', '/nafhan')
        } else {
            window.history.pushState({}, '', '/')
        }
    }, [hasEntered])

    return (
    <>
        <PortalTransition isZooming={isZooming} />
        {hasEntered && <MapNav />}

        <Suspense fallback={<div style={{color:'white', textAlign:'center', paddingTop:'20%', fontFamily:'monospace'}}>GENERATING WORLD...</div>}>
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
                    <TimeTravelSection onEnterFuture={() => setHasEnteredFuture(true)} />
                    {hasEnteredFuture && <QuestLogSection />}
                    <MinecraftFooter/>
                </>
            )}
        </Suspense>
    </>
)
}

export default App
