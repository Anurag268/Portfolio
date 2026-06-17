import { getPortfolio } from "@/app/actions/portfolio";
import EditorForm from "./EditorForm";

export default async function AdminDashboard() {
  const portfolio = await getPortfolio();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio Content</h1>
        <p className="text-zinc-400">Update your website content in real-time. Changes are saved directly to MongoDB.</p>
      </div>
      
      <EditorForm portfolio={portfolio} />
    </div>
  );
}
