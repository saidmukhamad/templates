type Props = {};

function App({}: Props) {
  return (
    <div className="w-screen h-screen flex flex-col space-y-4 p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Component Testing Area</h2>
          <span className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full">Live Preview</span>
        </div>

        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-500">Add your components here to test them in isolation</p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <code className="text-sm text-gray-600">Edit src/pages/App.tsx to start building</code>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Quick Start</h3>
        <p className="text-gray-600">Begin by creating new components in the components directory</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Documentation</h3>
        <p className="text-gray-600">Check React docs for component patterns and best practices</p>
      </div>
    </div>
  );
}

export default App;
