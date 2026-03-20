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
      <div className="mb-4 flex gap-5 border-b border-dotted border-black/15">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`-mb-px border-b px-0 py-2 text-sm font-body font-medium transition-colors ${
              active === i
                ? 'border-black/35 text-black'
                : 'border-transparent text-black/50 hover:border-black/20 hover:text-black'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{tabs[active].content}</div>
    </div>
  )
}
