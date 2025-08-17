import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <ShoppingCart className="w-7 h-7 text-blue-600" />
        Home
      </h1>
      <p className="text-gray-600 mb-4">Welcome to the e-commerce app scaffold.</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => toast.success('Hello from Toastify!')}
      >
        Show Toast
      </button>
    </div>
  );
}
