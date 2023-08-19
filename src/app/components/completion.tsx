"use client";

import { useChat, useCompletion } from "ai/react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="bg-gray-900 text-white border border-gray-700 shadow-xl p-8 rounded-xl max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Recipe Generator</h1>
      <p className="mb-4">
        Type in any food you have in your fridge or pantry and our low carbon
        bot will serve you up a recipe right away.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          placeholder="Enter your ingredients here..."
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-700 rounded-md placeholder-gray-300 focus:outline-none focus:border-blue-400 bg-gray-800 text-white"
        />
        <ReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            li({ children }) {
              return <li className="mb-2 last:mb-0">{children}</li>;
            },
          }}
        >
          {completion}
        </ReactMarkdown>
        <div className="flex justify-start space-x-4">
          <button
            disabled={isLoading}
            type="submit"
            className={`py-2 px-4 bg-blue-500 text-white rounded-md flex-1 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-400"
            } focus:outline-none`}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={stop}
            className="py-2 flex-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
          >
            Stop
          </button>
        </div>
      </form>
    </div>
  );
}
