import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#4800FF]/10 text-[#4800FF] flex items-center justify-center mx-auto mb-5 shadow-xs">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>
        <h2 className="text-lg font-bold text-gray-800 mt-2">
          Page Not Found
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          The page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
        </p>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#4800FF] py-3 px-5 text-sm font-semibold text-white shadow-md shadow-[#4800FF]/25 hover:bg-[#3d00d6] transition active:scale-[0.99]"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
