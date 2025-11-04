export default function BoardsLayout({ children }) {
    return (
        <div className="boards-layout">
            <h1 className="mb-4">공지사항</h1>
            {children}
        </div>
    );
}

