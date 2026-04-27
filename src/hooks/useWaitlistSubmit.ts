import { useState, useCallback } from 'react';
import { submitWaitlist, type WaitlistPayload } from '../services/waitlistSubmit';
import { useToast } from '../context/ToastContext';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useWaitlistSubmit(defaultSource: string) {
  const { addToast } = useToast();
  const [status, setStatus] = useState<Status>('idle');

  const submit = useCallback(
    async (payload: Omit<WaitlistPayload, 'source'> & { source?: string }) => {
      setStatus('loading');
      try {
        await submitWaitlist({
          name: payload.name,
          email: payload.email,
          persona: payload.persona,
          source: payload.source ?? defaultSource,
        });
        setStatus('success');
        addToast("You're on the list. We'll be in touch soon.", 'success');
      } catch (e) {
        setStatus('error');
        const msg =
          e instanceof Error ? e.message : 'Could not submit. Please try again.';
        addToast(msg, 'error', 8000);
      }
    },
    [addToast, defaultSource],
  );

  const reset = useCallback(() => setStatus('idle'), []);

  return { submit, status, reset };
}
