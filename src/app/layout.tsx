import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { EmergencyProvider } from '@/context/EmergencyContext';
import Navbar from '@/components/common/Navbar';
import EmergencySOSModal from '@/components/common/EmergencySOSModal';
import AIChatbotWidget from '@/components/common/AIChatbotWidget';

export const metadata: Metadata = {
  title: 'PulseWatch AI | Real-Time Social Listening & Patient Safety Intelligence',
  description: 'AI-powered healthcare ecosystem connecting hospitals, doctors, patients, pharmacies, and emergency response teams with predictive life-threat intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <EmergencyProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
              </div>
              <EmergencySOSModal />
              <AIChatbotWidget />
            </EmergencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
