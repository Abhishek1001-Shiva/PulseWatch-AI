'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  ShieldAlert, 
  X, 
  MessageSquare, 
  Volume2, 
  ChevronRight,
  HeartPulse,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { useEmergency } from '@/context/EmergencyContext';
import { speakText, playAudioBeep } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isEmergencyAlert?: boolean;
  firstAidSteps?: string[];
}

export default function AIChatbotWidget({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! I am PulseWatch AI Triage Assistant. How can I assist your health right now? Describe symptoms or ask for immediate first-aid guidance.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { triggerEmergency } = useEmergency();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI medical analysis simulation
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse: Message;

      if (lower.includes('chest') || lower.includes('heart') || lower.includes('stroke') || lower.includes('breathing') || lower.includes('choking') || lower.includes('bleed')) {
        playAudioBeep('sos');
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: '⚠️ CRITICAL SYMPTOM DETECTED: Your symptoms indicate potential high-risk cardiac or trauma escalation.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isEmergencyAlert: true,
          firstAidSteps: [
            'Sit down immediately and rest in a comfortable position.',
            'Loosen tight clothing around neck and chest.',
            'If conscious and not allergic, consider chewing 300mg Aspirin if advised.',
            'Keep airway clear. Emergency SOS trigger recommended below.'
          ]
        };
        speakText('Critical symptom alert. Immediate medical triage suggested.');
      } else if (lower.includes('headache') || lower.includes('fever') || lower.includes('dizzy')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'I recommend checking your hydration levels, resting in a dim room, and checking body temperature. If accompanied by sudden visual changes or neck stiffness, consult a physician immediately.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          firstAidSteps: [
            'Hydrate with electrolytes or water.',
            'Record resting blood pressure if monitor is nearby.',
            'Rest for 20-30 minutes.'
          ]
        };
      } else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Understood. Based on clinical guidelines, monitor these symptoms. Would you like to schedule a telemedicine appointment with Dr. Sarah Jenkins or look up nearest open clinics?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 900);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use keyboard input.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        setIsListening(true);
        recognition.start();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
          handleSend(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      }
    } catch {
      setIsListening(false);
    }
  };

  if (!isOpen && !embedded) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-2xl shadow-sky-500/40 hover:scale-110 active:scale-95 transition flex items-center gap-2 group"
      >
        <Bot className="w-6 h-6 animate-bounce" />
        <span className="text-xs font-bold pr-1 hidden group-hover:inline">Ask Pulse AI</span>
      </button>
    );
  }

  return (
    <div className={`${embedded ? 'w-full h-full' : 'fixed bottom-6 right-6 z-50 w-[380px] h-[520px] shadow-2xl'} rounded-3xl bg-slate-950 border border-slate-800 flex flex-col overflow-hidden backdrop-blur-2xl`}>
      {/* Chat Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              PulseWatch AI Health Bot
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <p className="text-[10px] text-slate-400">First-Aid Triage & Voice Guidance</p>
          </div>
        </div>

        {!embedded && (
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-tr-sm'
                  : m.isEmergencyAlert
                  ? 'bg-red-950/80 border border-red-500/40 text-red-200 rounded-tl-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>

              {/* First aid guide list */}
              {m.firstAidSteps && (
                <div className="mt-2 pt-2 border-t border-red-500/20 space-y-1 text-[11px]">
                  <p className="font-bold text-amber-300">Recommended Steps:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    {m.firstAidSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Emergency Trigger Shortcut */}
              {m.isEmergencyAlert && (
                <button
                  onClick={() => triggerEmergency('CARDIAC_ARREST')}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 active:scale-95 transition"
                >
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                  <span>TRIGGER SOS EMERGENCY DISPATCH NOW</span>
                </button>
              )}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900 w-20 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-200" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-1.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[10px]">
        <button
          onClick={() => handleSend('Sudden chest tightness and sweating')}
          className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 whitespace-nowrap hover:bg-red-500/20"
        >
          Chest Tightness
        </button>
        <button
          onClick={() => handleSend('What is the first aid for burn trauma?')}
          className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700"
        >
          Burn First Aid
        </button>
        <button
          onClick={() => handleSend('Check my current prescription interactions')}
          className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 whitespace-nowrap hover:bg-sky-500/20"
        >
          Drug Interactions
        </button>
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={handleVoiceToggle}
          className={`p-2 rounded-xl transition ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
          title="Voice Dictation"
        >
          {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isListening ? "Listening to your voice..." : "Type symptoms or medical queries..."}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
