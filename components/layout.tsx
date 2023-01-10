import Navbar from "./navbar";

export default function Layout({ children }:any) {
  return (
    <div className="dark:bg-dark h-full">
      <Navbar />
      <main>
        <div className="max-h-screen h-screen">
            {children}
        </div>
      </main>
    </div>
  );
}
