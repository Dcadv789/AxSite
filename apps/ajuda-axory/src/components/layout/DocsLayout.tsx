import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import DocsSidebar from './DocsSidebar';
import DocsUnifiedHeader from './DocsUnifiedHeader';
import PageContainer from './PageContainer';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          />
          <div className="absolute inset-y-0 left-0 z-50 shadow-xl">
            <DocsSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <PageContainer className="flex flex-1 flex-col py-12 min-h-0">
        <div className="flex w-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <DocsUnifiedHeader onOpenSidebar={() => setSidebarOpen(true)} />

          <div className="flex min-h-0 flex-1">
            <div className="hidden lg:flex shrink-0">
              <DocsSidebar />
            </div>

            <main className="min-w-0 flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
