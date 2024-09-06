import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileSpreadsheet, Send, Key } from 'lucide-react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Alert = ({ message, type }) => (
  <div className={`p-4 mb-4 rounded-md ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
    {message}
  </div>
);



const App = () => {
const [fileContent, setFileContent] = useState('');
const [prompt, setPrompt] = useState('');
const [generatedText, setGeneratedText] = useState('');
const [alert, setAlert] = useState(null);




const handleFileUpload = (event) => {
const file = event.target.files[0];
const reader = new FileReader();

reader.onload = (e) => {
  try {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    const textContent = jsonData.map(row => row.join('\t')).join('\n');
    setFileContent(textContent);
    setAlert({ message: 'File uploaded and processed successfully', type: 'success' });
  } catch (error) {
    setAlert({ message: 'Error processing file: ' + error.message, type: 'error' });
  }
};

if (file.name.endsWith('.csv')) {
  reader.readAsText(file);
} else {
  reader.readAsArrayBuffer(file);
}
};

const generatePrompt = async () => {


try {
  const response = await axios.post('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
    model: "GigaChat",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates prompts based on Excel or CSV content."
      },
      {
        role: "user",
        content: `Generate a prompt based on the following file content:\n\n${fileContent}`
      }
    ],
    temperature: 0.7
  }, {

    headers: {
      'Authorization': `Bearer ${access}`,
    }
  });

  setPrompt(response.data.choices[0].message.content);
  setAlert({ message: 'Prompt generated successfully', type: 'success' });
} catch (error) {
  if (error.response && error.response.status === 401) {
    setAlert({ message: 'Access token expired. Please obtain a new one.', type: 'error' });
  } else {
    setAlert({ message: 'Error generating prompt: ' + error.message, type: 'error' });
  }
}
};

const generateText = async () => {


try {
  const response = await axios.post('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
    model: "GigaChat",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  }, {
    headers: {
       'Authorization': `Bearer ${access}`
    }
  });

  setGeneratedText(response.data.choices[0].message.content);
  setAlert({ message: 'Text generated successfully', type: 'success' });
} catch (error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('gigachatAccessToken');
    setAlert({ message: 'Access token expired. Please obtain a new one.', type: 'error' });
  } else {
    setAlert({ message: 'Error generating text: ' + error.message, type: 'error' });
  }
}
};

return (
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Excel/CSV to Prompt Generator</h1>
  {alert && <Alert message={alert.message} type={alert.type} />}

  <Card className="p-4 mb-4">

    <h2 className="text-xl font-semibold mb-2">Step 1: Upload Excel or CSV File</h2>
    <div className="flex items-center">
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
        <FileSpreadsheet className="mr-2" />
        <span>Upload Excel/CSV File</span>
      </label>
    </div>
  </Card>
  <Card className="p-4 mb-4">
    <h2 className="text-xl font-semibold mb-2">Step 2: Generate Prompt</h2>
    <Button onClick={generatePrompt} >Generate Prompt</Button>
    <textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Generated prompt will appear here"
      rows={4}
      className="w-full mt-2 p-2 border rounded"
    />
  </Card>
  <Card className="p-4">
    <h2 className="text-xl font-semibold mb-2">Step 3: Generate Text</h2>
    <Button onClick={generateText} >
      <Send className="mr-2" />
      Generate Text
    </Button>
    <textarea
      value={generatedText}
      placeholder="Generated text will appear here"
      rows={6}
      className="w-full mt-2 p-2 border rounded"
      readOnly
    />
  </Card>
</div>
);
};

const routes = [{ path: "/", component: App, title: "Starter" }];

const Router = () => {
  return (
    <div>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </div>
  );
};
export { routes, Router };
