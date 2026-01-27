import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import FeedbackButton from '../common/FeedbackButton';
import ScrollToTop from '../common/ScrollToTop';
import CursorTrail from '../effects/CursorTrail';

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] cursor-none">
            <CursorTrail />
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <FeedbackButton />
            <ScrollToTop />
        </div>
    );
}

export default MainLayout;
