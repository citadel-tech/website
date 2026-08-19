import { getNavWithDocIds } from '../../constants/docsNav.js'
import SidebarSection from './SidebarSection.jsx'

function SidebarItem({ item, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item)}
      className={`block w-full text-left px-4 py-2 font-body text-sm transition-colors ${
        isActive
          ? 'border-l-2 border-black font-semibold text-black'
          : 'border-l-2 border-transparent text-black/55 hover:text-black hover:border-black/25'
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
    <nav className="h-full overflow-y-auto pb-6 pt-3">
      {nav.map(section => {
        // Static entry (Get Started)
        if (section.static) {
          return (
            <div key={section.id} className="border-b border-dotted border-black/12">
              <button
                onClick={() => onSelect(null)}
                className={`w-full px-4 py-3 text-left font-body text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                  activeDocId === null
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
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
            <div key={section.id} className="border-b border-dotted border-black/12">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="font-body text-sm font-semibold uppercase tracking-[0.1em] text-black/65">
                  {section.label}
                </span>
                <span className="rounded bg-black/8 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-black/65">
                  soon
                </span>
              </div>
            </div>
          )
        }

        // Normal sections with items
        return (
          <SidebarSection
            key={`${section.id}-${section.items?.some(item => item.docId === activeDocId) ? 'active' : 'idle'}`}
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
