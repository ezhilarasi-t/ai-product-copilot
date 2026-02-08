import React from "react";

const ResultPage = ({ result, onBack }) => {
  if (!result) return null;

  const { bestMatch, alternatives = [], summary } = result;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 text-white">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-sm text-amber-400 hover:text-amber-300 mb-4"
        >
          ← Back
        </button>

        {/* BEST MATCH */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300">
              Best Choice
            </span>
            <h2 className="text-2xl font-semibold">Recommended for You</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-white/10 rounded-2xl p-5">

            {/* IMAGE */}
            <div className="flex justify-center items-center">
              <img
                src={bestMatch?.image || "https://via.placeholder.com/300"}
                alt={bestMatch?.name}
                className="max-h-64 rounded-xl object-contain shadow-lg"
              />
            </div>

            {/* DETAILS */}
            <div>
              <h3 className="text-2xl font-bold">{bestMatch?.name}</h3>
              <p className="text-lg text-amber-400 mt-1">
                {bestMatch?.price}
              </p>

              {/* Confidence */}
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>AI Confidence</span>
                  <span>{bestMatch?.confidence}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: bestMatch?.confidence || "80%" }}
                  />
                </div>
              </div>

              {bestMatch?.why && (
                <p className="mt-4 text-sm text-gray-300">
                  {bestMatch.why}
                </p>
              )}

              {/* Pros & Cons */}
              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Pros</h4>
                  <ul className="space-y-1">
                    {(bestMatch?.pros || []).map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-1">Cons</h4>
                  <ul className="space-y-1">
                    {(bestMatch?.cons || []).map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ALTERNATIVES */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Good Alternatives</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {alternatives.map((alt, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition"
              >
                <div className="font-medium">{alt.name}</div>
                <p className="text-sm text-gray-300 mt-1">
                  {alt.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SUMMARY */}
        {summary && (
          <section className="border-t border-white/10 pt-4">
            <h4 className="font-semibold mb-2">AI Summary</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {summary}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
