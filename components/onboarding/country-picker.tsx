'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { countries } from '@/lib/constants/countries'

interface CountryPickerProps {
  selected: string[]
  onChange: (codes: string[]) => void
}

export function CountryPicker({ selected, onChange }: CountryPickerProps) {
  const [search, setSearch] = useState('')

  const toggle = (code: string) => {
    if (selected.includes(code)) {
      onChange(selected.filter((c) => c !== code))
    } else {
      onChange([...selected, code])
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return countries
    const q = search.toLowerCase()
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    )
  }, [search])

  // Pin selected countries to top
  const sorted = useMemo(() => {
    const sel = filtered.filter((c) => selected.includes(c.code))
    const rest = filtered.filter((c) => !selected.includes(c.code))
    return [...sel, ...rest]
  }, [filtered, selected])

  return (
    <div>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search countries..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>

      {/* Country chips */}
      <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-1">
        {sorted.map((country) => {
          const isSelected = selected.includes(country.code)
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => toggle(country.code)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isSelected
                  ? 'bg-destructive/10 border-destructive/30 text-destructive'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <span className="text-sm leading-none">{country.flag}</span>
              {country.code}
              <span className="hidden sm:inline">- {country.name}</span>
            </button>
          )
        })}
        {sorted.length === 0 && (
          <p className="text-muted-foreground text-xs py-2">No countries match your search.</p>
        )}
      </div>

      {selected.length > 0 && (
        <p className="text-muted-foreground text-xs mt-2">
          {selected.length} {selected.length === 1 ? 'country' : 'countries'} blocked
        </p>
      )}
    </div>
  )
}
