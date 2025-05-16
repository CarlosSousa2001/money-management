'use client';

import { useState, useTransition } from 'react';
import { sendEmail } from './api/send-email-help'; // adapte o path se necessário
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // opcional, para classes condicionais

export default function HelpContactForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('idle');

    startTransition(async () => {
      try {
        await sendEmail(email, subject, message);
        setStatus('success');
        setEmail('');
        setSubject('');
        setMessage('');
      } catch (err) {
        console.error('Erro ao enviar e-mail:', err);
        setStatus('error');
      }
    });
  };

  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4">Fale com o Suporte</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Assunto"
          value={subject}
          required
          onChange={(e) => setSubject(e.target.value)}
        />

        <Textarea
          className="resize-none bg-white dark:bg-input/30"
          placeholder="Digite sua mensagem"
          value={message}
          required
          rows={6}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>

        {status === 'success' && (
          <p className="text-green-600 text-sm">Mensagem enviada com sucesso!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm">Erro ao enviar. Tente novamente.</p>
        )}
      </form>
    </section>
  );
}
