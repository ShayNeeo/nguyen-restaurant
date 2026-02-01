'use client';

import { useState } from 'react';
import { getBackendApiUrl } from '@/lib/api';

export default function AdminNewsletter() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isHtml, setIsHtml] = useState(true);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to send this email to ALL subscribers?')) return;

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
          is_html: isHtml 
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
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Send Newsletter</h2>
        <p className="mb-6 text-sm text-gray-400">
          Compose and send emails to all subscribed customers.
        </p>

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
            {isHtml && (
              <p className="mt-1 text-xs text-gray-500">
                Basic HTML tags are supported. The content will be wrapped in a standard template.
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-md bg-yellow-500 px-6 py-2 font-semibold text-gray-900 transition hover:bg-yellow-400 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Newsletter'}
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

      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">Preview</h3>
        <div className="prose prose-invert max-w-none rounded-md bg-white p-4 text-black">
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
