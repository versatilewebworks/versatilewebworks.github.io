'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

const initialFormState = {
  name: '',
  email: '',
  message: '',
};

type FormState = typeof initialFormState;

type SubmitStatus = 'idle' | 'submitted' | 'error';

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [field]: event.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus('error');
      return;
    }

    setFormState(initialFormState);
    setStatus('submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft sm:p-10">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-900">
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          value={formState.name}
          onChange={handleChange('name')}
          placeholder="Alex Johnson"
          className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-900">
          Email address
        </label>
        <input
          id="contact-email"
          type="email"
          value={formState.email}
          onChange={handleChange('email')}
          placeholder="alex@example.com"
          className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-900">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={formState.message}
          onChange={handleChange('message')}
          placeholder="Let us know how we can help."
          className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-600">
            This is a client-side contact placeholder. No personal message data is stored by the platform unless you choose to send it via your own email service.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Send message
        </button>
      </div>

      {status === 'submitted' && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Thanks for reaching out! Your message has been acknowledged locally, and our support team is ready to connect if you choose to email us directly.
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Please complete all fields before sending your message.
        </div>
      )}
    </form>
  );
}
