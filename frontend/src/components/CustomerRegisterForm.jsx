import { useState } from "react";
import ResultPage from "./ResultPage";

const priorities = [
  "Performance",
  "Camera Quality",
  "Battery life",
  "Affordable Price",
  "Storage Capacity",
];

const usageType = [
  "Gaming",
  "Daily Use",
  "Work",
  "Content Creation",
  "Photography",
];

const CustomerRegisterForm = () => {
  const [details, setDetails] = useState({
    budget: "",
    priorities: [],
    usageType: "",
    additionalPreference: "",
  });

  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const handleTopPriorities = (e) => {
    const { value, checked } = e.target;
    setDetails((prev) => ({
      ...prev,
      priorities: checked
        ? [...prev.priorities, value]
        : prev.priorities.filter((p) => p !== value),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        budget: details.budget,
        priorities: details.priorities,
        usage: details.usageType,
        additionalPreference: details.additionalPreference,
      };

      const res = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formBtnDisabled =
    !details.budget || details.priorities.length === 0 || !details.usageType;

  if (Object.keys(response).length > 0) {
    return <ResultPage result={response} onBack={() => setResponse({})} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 text-white">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">
            AI Product Decision Copilot
          </h1>
          <p className="text-gray-400 mt-2">
            Find the best smartphone tailored to your needs
          </p>
        </div>

        {/* Budget */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">
            Budget (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 30000"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-amber-400"
            onChange={(e) =>
              setDetails({ ...details, budget: e.target.value })
            }
          />
        </div>

        {/* Priorities */}
        <div className="mb-5">
          <label className="block mb-3 text-sm font-medium">
            Top Priorities
          </label>
          <div className="flex flex-wrap gap-3">
            {priorities.map((item) => (
              <label
                key={item}
                className={`px-4 py-2 rounded-full border cursor-pointer text-sm transition
                  ${
                    details.priorities.includes(item)
                      ? "bg-amber-400 text-black border-amber-400"
                      : "border-white/20 hover:border-amber-300"
                  }`}
              >
                <input
                  type="checkbox"
                  value={item}
                  className="hidden"
                  onChange={handleTopPriorities}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="mb-5">
          <label className="block mb-3 text-sm font-medium">
            Usage Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {usageType.map((item) => (
              <label
                key={item}
                className={`p-3 rounded-xl border cursor-pointer text-sm text-center transition
                  ${
                    details.usageType === item
                      ? "bg-amber-400 text-black border-amber-400"
                      : "border-white/20 hover:border-amber-300"
                  }`}
              >
                <input
                  type="radio"
                  name="usageType"
                  value={item}
                  className="hidden"
                  onChange={(e) =>
                    setDetails({ ...details, usageType: e.target.value })
                  }
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Additional Preference */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Additional Preference
          </label>
          <textarea
            rows="3"
            placeholder="Brand, camera type, display size..."
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-amber-400 resize-none"
            onChange={(e) =>
              setDetails({
                ...details,
                additionalPreference: e.target.value,
              })
            }
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={formBtnDisabled || loading}
          className={`w-full py-3 rounded-xl font-medium transition
            ${
              formBtnDisabled || loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-amber-400 text-black hover:bg-amber-300"
            }`}
        >
          {loading ? "Analyzing with AI..." : "Find My Best Match"}
        </button>
      </div>
    </div>
  );
};

export default CustomerRegisterForm;
