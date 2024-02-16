import { Link, Outlet } from 'react-router-dom';


export default function BaseLayout() {
    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-30 border-b bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6">
                    <Link to="/">
                        <h1 className="font-mono text-3xl font-bold text-primary">
                            Form Drag & Drop
                        </h1>
                    </Link>
                </div>
            </header>
            <main className="mx-auto mt-16 max-w-[1440px] px-6 py-5">
                <Outlet />
            </main>
        </>
    );
}
