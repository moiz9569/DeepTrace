"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import axios from "axios";
import React, { useState } from "react";
import {
  Key,
  Copy,
  Download,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileText,
  Code,
  ExternalLink,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [selectedLanguage, setSelectedLanguage] = useState('js');
  const { user } = useAuth();

  // Generate API Key function
  const generateApiKey = async () => {
    setLoading(true);
    setMessage("");
    if (!user) {
      setMessage("User not authenticated. Please log in.");
      setMessageType("error");
      setLoading(false);
      return;
    }
    try {
      console.log("Generating API Key for user:", user?.name, user?.email);
      const res = await axios.post("/api/FreeApi", {
        name: user?.name,
        email: user?.email,
      });

      const data = res.data;

      if (data.success) {
        setApiKey(data.apiKey);
        console.log("Generated API Key:", data.apiKey);
        setMessage("API Key generated successfully!");
        setMessageType("success");
      } else {
        setMessage(data.error || "Something went wrong");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      setMessage(err.response?.data?.error || err.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setMessage("API Key copied to clipboard!");
    setMessageType("success");
    
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Copy example code
  const copyExampleCode = () => {
    let code = '';
    switch(selectedLanguage) {
      case 'js':
        code = `async function analyzeText() {
  const response = await fetch("https://yourdomain.com/api/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY"
    },
    body: JSON.stringify({
      text: "This is AI generated content"
    })
  });
  
  const data = await response.json();
  console.log(data);
}

analyzeText();`;
        break;
      case 'py':
        code = `import requests

url = "https://yourdomain.com/api/text"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
}
data = {
    "text": "This is AI generated content"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;
        break;
      case 'php':
        code = `<?php
$url = "https://yourdomain.com/api/text";
$data = json_encode([
    "text" => "This is AI generated content"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-key: YOUR_API_KEY"
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`;
        break;
      case 'cs':
        code = `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("x-api-key", "YOUR_API_KEY");
        
        var json = "{\\"text\\":\\"This is AI generated content\\"}";
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await client.PostAsync("https://yourdomain.com/api/text", content);
        var result = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(result);
    }
}`;
        break;
    }
    
    navigator.clipboard.writeText(code);
    setMessage("Example code copied to clipboard!");
    setMessageType("success");
    
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Read API Documentation
  const readDocumentation = () => {
    window.open('/docs/api-documentation.pdf', '_blank');
    setMessage("Opening documentation...");
    setMessageType("success");
  };

  // Download API Documentation
  const downloadDocumentation = () => {
    const link = document.createElement('a');
    link.href = '/docs/api-documentation.pdf';
    link.download = 'api-documentation.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setMessage("Documentation download started!");
    setMessageType("success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl shadow-lg mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            API Access Management
          </h1>
          <p className="text-slate-600 text-lg">
            Generate and manage your API keys for seamless integration
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Decorative Header */}
          <div className="relative h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"></div>
          
          <div className="p-8">
            {/* User Info */}
            {user && (
              <div className="mb-8 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Shield className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-sm text-teal-700">Authenticated as</p>
                    <p className="font-semibold text-slate-900">
                      {user.name} • {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* API Key Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <Key className="w-5 h-5 text-teal-600" />
                  Your API Key
                </h2>
                {apiKey && (
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Active Key
                  </span>
                )}
              </div>

              {apiKey ? (
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      value={apiKey}
                      readOnly
                      className="w-full p-4 pr-24 bg-slate-50 border-2 border-teal-200 rounded-xl font-mono text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all flex items-center gap-2 shadow-sm group-hover:shadow"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                  </div>
                  
                  <div className="flex items-start gap-2 p-3 bg-teal-50 rounded-lg border border-teal-100">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-teal-800">
                      Your API key is ready to use. Keep it secure and never share it publicly.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-gradient-to-r from-slate-50 to-teal-50/30 rounded-xl border-2 border-dashed border-teal-200">
                  <Key className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">
                    You haven't generated an API key yet. Click the button below to create one.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={generateApiKey}
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all relative overflow-hidden shadow-md
                  ${loading 
                    ? "bg-slate-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 hover:shadow-lg active:scale-[0.99]"
                  }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate New API Key</span>
                  </>
                )}
              </button>

              <button
                onClick={readDocumentation}
                className="px-6 py-3 bg-white border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all flex items-center gap-2 font-medium"
              >
                <BookOpen className="w-5 h-5" />
                <span>Read Docs</span>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </button>

              <button
                onClick={downloadDocumentation}
                className="px-6 py-3 bg-white border-2 border-orange-200 text-orange-700 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all flex items-center gap-2 font-medium"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 animate-fadeIn
                ${messageType === "success" 
                  ? "bg-emerald-50 border border-emerald-200" 
                  : "bg-red-50 border border-red-200"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${messageType === "success" ? "text-emerald-800" : "text-red-800"}`}>
                  {message}
                </p>
              </div>
            )}

            {/* How to Use Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-teal-600" />
                  Quick Start Guide
                </h3>
                <ol className="space-y-3">
                  {[
                    "Copy your API Key using the button above",
                    "Add it to your request headers as x-api-key",
                    "Make API calls to our endpoints",
                    "Your free credits will be automatically deducted"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-slate-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  API Endpoints
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-blue-100">
                    <code className="text-sm font-mono text-blue-700 block mb-1">POST /api/text</code>
                    <p className="text-xs text-slate-500">Extract and analyze text from media</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-100">
                    <code className="text-sm font-mono text-blue-700 block mb-1">POST /api/image</code>
                    <p className="text-xs text-slate-500">Process and analyze images</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-100">
                    <code className="text-sm font-mono text-blue-700 block mb-1">Header: x-api-key</code>
                    <p className="text-xs text-slate-500">Authentication header with your API key</p>
                  </div>
                </div>
              </div>
            </div>

            {/* API Examples Section with Language Selector */}
            <div className="p-6 bg-slate-900 rounded-xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <h3 className="font-semibold text-white">API Examples</h3>
                </div>
                
                {/* Language Selector */}
                <div className="flex gap-2">
                  {[
                    { id: 'js', name: 'JS', icon: '⚡', label: 'JavaScript' },
                    { id: 'py', name: 'Python', icon: '🐍', label: 'Python' },
                    { id: 'php', name: 'PHP', icon: '🐘', label: 'PHP' },
                    { id: 'cs', name: 'C#', icon: '🎯', label: 'C#' },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5
                        ${selectedLanguage === lang.id 
                          ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                        }`}
                    >
                      <span>{lang.icon}</span>
                      <span className="hidden sm:inline">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Examples */}
              <div className="relative">
                {/* JavaScript Example */}
                {selectedLanguage === 'js' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-yellow-600/20 text-yellow-500 text-xs rounded-full">JavaScript</span>
                    </div>
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <code>{`// JavaScript Example
async function analyzeText() {
  const response = await fetch("https://yourdomain.com/api/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY"
    },
    body: JSON.stringify({
      text: "This is AI generated content"
    })
  });
  
  const data = await response.json();
  console.log(data);
}

analyzeText();`}</code>
                    </pre>
                  </div>
                )}

                {/* Python Example */}
                {selectedLanguage === 'py' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-600/20 text-blue-500 text-xs rounded-full">Python</span>
                    </div>
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <code>{`# Python Example
import requests

url = "https://yourdomain.com/api/text"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
}
data = {
    "text": "This is AI generated content"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}</code>
                    </pre>
                  </div>
                )}

                {/* PHP Example */}
                {selectedLanguage === 'php' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-purple-600/20 text-purple-500 text-xs rounded-full">PHP</span>
                    </div>
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <code>{`<?php
// PHP Example
$url = "https://yourdomain.com/api/text";
$data = json_encode([
    "text" => "This is AI generated content"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-key: YOUR_API_KEY"
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`}</code>
                    </pre>
                  </div>
                )}

                {/* C# Example */}
                {selectedLanguage === 'cs' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-green-600/20 text-green-500 text-xs rounded-full">C#</span>
                    </div>
                    <pre className="text-sm text-slate-300 font-mono overflow-x-auto bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <code>{`// C# Example
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("x-api-key", "YOUR_API_KEY");
        
        var json = "{\\"text\\":\\"This is AI generated content\\"}";
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await client.PostAsync("https://yourdomain.com/api/text", content);
        var result = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(result);
    }
}`}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Copy Button */}
              <button
                onClick={copyExampleCode}
                className="mt-4 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm border border-slate-700"
              >
                <Copy className="w-4 h-4" />
                Copy {selectedLanguage === 'js' ? 'JavaScript' : 
                       selectedLanguage === 'py' ? 'Python' :
                       selectedLanguage === 'php' ? 'PHP' : 'C#'} Example
              </button>
            </div>

            {/* Security Note */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Security Notice</p>
                <p className="text-xs text-yellow-700">
                  Never share your API key publicly or commit it to version control. 
                  If you suspect your key has been compromised, generate a new one immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}