import { getNavWithDocIds } from '../../constants/docsNav'
import SidebarSection from './SidebarSection'

function SidebarItem({ item, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item)}
      className={`block w-full text-left px-4 py-1.5 font-mono text-lg transition-colors ${
        isActive
          ? 'border-l-2 border-cream font-semibold text-cream'
          : 'border-l-2 border-transparent text-cream/55 hover:text-cream hover:border-cream/25'
      }`}
    >
      {item.label}
    </button>
  )
}

function ItemList({ items, activeDocId, onSelect }) {
  return items.map(item => (
    <SidebarItem
      key={item.docId}
      item={item}
      isActive={activeDocId === item.docId}
      onSelect={onSelect}
    />
  ))
}

export default function DocsSidebar({ activeDocId, onSelect }) {
  const nav = getNavWithDocIds()

  return (
    <nav className="overflow-y-auto">
      {nav.map(section => {
        // Static entry (Get Started)
        if (section.static) {
          return (
            <div key={section.id} className="border-b border-dotted border-cream/12">
              <button
                onClick={() => onSelect(null)}
                className={`w-full px-4 py-3 text-left font-mono text-lg font-semibold uppercase tracking-[0.14em] transition-colors ${
                  activeDocId === null
                    ? 'text-cream'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                {section.label}
              </button>
            </div>
          )
        }

        // Coming soon
        if (section.comingSoon) {
          return (
            <div key={section.id} className="border-b border-dotted border-cream/12">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="font-mono text-lg font-semibold uppercase tracking-[0.14em] text-cream/35">
                  {section.label}
                </span>
                <span className="rounded bg-cream/8 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cream/35">
                  soon
                </span>
              </div>
            </div>
          )
        }

        // Normal sections with items
        return (
          <SidebarSection
            key={section.id}
            label={section.label}
            defaultOpen={section.items?.some(item => item.docId === activeDocId)}
          >
            <ItemList items={section.items} activeDocId={activeDocId} onSelect={onSelect} />
          </SidebarSection>
        )
      })}
    </nav>
  )
}
