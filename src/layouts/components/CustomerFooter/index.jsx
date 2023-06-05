function Header({ children }) {
    return (
        <header className="flex h-[150px] select-none items-center justify-center bg-green-500 font-medium text-slate-900">
            {children}
        </header>
    );
}

export default Header;
