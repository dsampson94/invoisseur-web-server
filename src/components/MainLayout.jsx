'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';

export function MainLayout({ children }) {
    const router = useRouter();
    const isRoot = router.pathname === '/';

    return (
        <div className="relative flex w-full flex-col">
            { isRoot && <Header /> }
            {/*<Background />*/}
            <main className="flex-auto">{ children }</main>
            { isRoot && <Footer /> }
        </div>
    );
}
