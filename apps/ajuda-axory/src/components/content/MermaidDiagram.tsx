import { useEffect, useRef } from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useThemeContext();
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Import dinâmico: o mermaid só carrega no cliente (mantém o build/SSR leve).
      const mermaid = (await import('mermaid')).default;
      if (cancelled || !ref.current) return;

      const currentId = id.current;
      const themedChart = chart.trim();

      mermaid.initialize({
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default',
        themeVariables:
          theme === 'dark'
            ? {
                primaryColor: '#1e3a8a',
                primaryTextColor: '#e2e8f0',
                primaryBorderColor: '#3b82f6',
                lineColor: '#6b7280',
                background: '#111827',
                mainBkg: '#1f2937',
                nodeBorder: '#374151',
                clusterBkg: '#1f2937',
                titleColor: '#f9fafb',
                edgeLabelBackground: '#374151',
                tertiaryColor: '#1f2937',
              }
            : {
                primaryColor: '#dbeafe',
                primaryTextColor: '#1e3a8a',
                primaryBorderColor: '#3b82f6',
                lineColor: '#6b7280',
              },
        securityLevel: 'loose',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 13,
      });

      try {
        const { svg } = await mermaid.render(currentId, themedChart);
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
        const svgEl = ref.current.querySelector('svg');
        if (svgEl) {
          svgEl.style.maxWidth = '100%';
          svgEl.style.height = 'auto';
          svgEl.style.borderRadius = '12px';
        }
      } catch {
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = `<pre class="text-xs text-red-500 p-3 bg-red-50 dark:bg-red-950 rounded-lg">${chart}</pre>`;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  return (
    <div className="my-6 flex justify-center overflow-x-auto rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4">
      <div ref={ref} className="w-full" />
    </div>
  );
}
