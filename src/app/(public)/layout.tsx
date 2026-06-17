import { getPortfolio } from "@/app/actions/portfolio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const portfolio = await getPortfolio();
  
  return (
    <>
      <Navbar portfolio={portfolio} />
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer portfolio={portfolio} />
    </>
  );
}
