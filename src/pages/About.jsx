import { Info } from 'lucide-react';

export default function About() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Info className="w-7 h-7 text-emerald-600" />
        About
      </h1>
      <p className="text-gray-600">This is a sample page to demonstrate React Router v5 routing.</p>
    </div>
  );
}
