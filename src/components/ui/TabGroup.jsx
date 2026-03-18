import { useState } from 'react'

/**
 * TabGroup
 * Props:
 *   tabs: [{ label: string, content: ReactNode }]
 *   defaultIndex?: number
 */
export default function TabGroup({ tabs, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-blue/30 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-body font-medium rounded-t-md transition-colors -mb-px border-b-2 ${
              active === i
                ? 'text-orange border-orange bg-orange/5'
                : 'text-cream/50 border-transparent hover:text-cream hover:border-cream/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div>{tabs[active].content}</div>
    </div>
  )
}
