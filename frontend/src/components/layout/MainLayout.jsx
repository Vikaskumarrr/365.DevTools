import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import FeedbackButton from '../common/FeedbackButton';
import ScrollToTop from '../common/ScrollToTop';
import SkipLink from '../common/SkipLink';
import CursorTrail from '../effects/CursorTrail';

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] cursor-none">
            <SkipLink />
            <CursorTrail />
            <Header />
            <main id="main-content" className="flex-1" role="main">
                <Outlet />
            </main>
            <Footer />
            <FeedbackButton />
            <ScrollToTop />
        </div>
    );
}

export default MainLayout;
