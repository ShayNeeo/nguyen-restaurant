'use client';

import { useState, useEffect } from 'react';
import { getBackendApiUrl } from '@/lib/api';

export default function AdminNewsletter() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isHtml, setIsHtml] = useState(true);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      const token = localStorage.getItem('restaurant_jwt_v1');
      const response = await fetch(getBackendApiUrl('/admin/newsletter/subscribers'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data);
        setSelectedEmails(data); // Default to all selected
      }
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedEmails.length === subscribers.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails([...subscribers]);
    }
  };

  const toggleSelectEmail = (email: string) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter(e => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmails.length === 0) {
      alert('Please select at least one subscriber.');
      return;
    }

    if (!confirm(`Are you sure you want to send this email to ${selectedEmails.length} subscribers?`)) return;

    setStatus('sending');
    setMessage('');

    try {
      const token = localStorage.getItem('restaurant_jwt_v1');
      const response = await fetch(getBackendApiUrl('/admin/newsletter/send'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          subject, 
          content: body, 
          is_html: isHtml,
          recipients: selectedEmails
        }),
      });

      const text = await response.text();
      if (response.ok) {
        setStatus('success');
        setMessage(text);
        setSubject('');
        setBody('');
      } else {
        setStatus('error');
        setMessage(`Error: ${text}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Failed to send request');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Editor */}
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Compose Newsletter</h2>
          
          <form onSubmit={handleSend} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="isHtml"
                checked={isHtml}
                onChange={(e) => setIsHtml(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              <label htmlFor="isHtml" className="text-sm font-medium text-gray-300 select-none cursor-pointer">
                Send as HTML
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
                placeholder="e.g. Special Offer: 20% Off This Weekend!"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Content {isHtml ? '(HTML)' : '(Plain Text)'}
              </label>
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white font-mono text-sm focus:border-yellow-500 focus:outline-none"
                placeholder={isHtml ? "<h1>Hello!</h1><p>Check out our new menu...</p>" : "Hello!\nCheck out our new menu..."}
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={status === 'sending' || selectedEmails.length === 0}
                className="rounded-md bg-yellow-500 px-6 py-2 font-semibold text-gray-900 transition hover:bg-yellow-400 disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : `Send to ${selectedEmails.length} Subscribers`}
              </button>

              {status === 'success' && (
                <span className="text-green-400">{message}</span>
              )}
              {status === 'error' && (
                <span className="text-red-400">{message}</span>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Subscriber Selection */}
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Subscribers ({subscribers.length})</h2>
            <button 
              onClick={fetchSubscribers}
              className="text-xs text-yellow-500 hover:text-yellow-400"
            >
              Refresh
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between bg-gray-800 p-2 rounded">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="select-all"
                checked={subscribers.length > 0 && selectedEmails.length === subscribers.length}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              <label htmlFor="select-all" className="text-sm font-medium text-gray-300 select-none cursor-pointer">
                Select All
              </label>
            </div>
            <span className="text-xs text-gray-500">{selectedEmails.length} selected</span>
          </div>

          <div className="flex-1 overflow-y-auto border border-gray-700 rounded-md">
            {isLoadingSubscribers ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : subscribers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No subscribers found</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-800 text-gray-400">
                  <tr>
                    <th className="px-4 py-2 w-10"></th>
                    <th className="px-4 py-2">Email Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {subscribers.map((email) => (
                    <tr 
                      key={email} 
                      className="hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => toggleSelectEmail(email)}
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedEmails.includes(email)}
                          onChange={() => {}} // Handled by tr onClick
                          className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-300">{email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">Preview</h3>
        <div className="prose prose-invert max-w-none rounded-md bg-white p-4 text-black overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4">{subject || '(No Subject)'}</h1>
          <hr className="my-4 border-gray-300"/>
          {isHtml ? (
            <div dangerouslySetInnerHTML={{ __html: body || '(No Content)' }} />
          ) : (
            <div className="whitespace-pre-wrap font-sans">{body || '(No Content)'}</div>
          )}
        </div>
      </div>
    </div>
  );
}