function Header({ children }) {
    return (
        <header className="flex h-8 select-none items-center justify-center  font-medium text-slate-900">
            {children}
            Header
        </header>
    );
}

export default Header;
