'use client'

import { useState, useCallback, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'

interface DomainTagInputProps {
  domains: string[]
  onChange: (domains: string[]) => void
  placeholder?: string
  error?: string
}

const DOMAIN_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/

function cleanDomain(input: string): string {
  let d = input.trim().toLowerCase()
  // Strip protocol and path
  d = d.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  // Strip www.
  d = d.replace(/^www\./, '')
  return d
}

export function DomainTagInput({ domains, onChange, placeholder = 'competitor.com', error }: DomainTagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const addDomains = useCallback(
    (raw: string) => {
      const parts = raw.split(/[,\n\s]+/).filter(Boolean)
      const newDomains: string[] = []
      let hadInvalid = false

      for (const part of parts) {
        const cleaned = cleanDomain(part)
        if (!cleaned) continue
        if (!DOMAIN_PATTERN.test(cleaned)) {
          hadInvalid = true
          continue
        }
        if (!domains.includes(cleaned) && !newDomains.includes(cleaned)) {
          newDomains.push(cleaned)
        }
      }

      if (newDomains.length > 0) {
        onChange([...domains, ...newDomains])
      }

      if (hadInvalid) {
        setInputError('Some entries were not valid domains')
        setTimeout(() => setInputError(''), 2000)
      }

      setInputValue('')
    },
    [domains, onChange]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputValue.trim()) {
        addDomains(inputValue)
      }
    }
    if (e.key === 'Backspace' && !inputValue && domains.length > 0) {
      onChange(domains.slice(0, -1))
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    if (pasted) {
      addDomains(pasted)
    }
  }

  const removeDomain = (domain: string) => {
    onChange(domains.filter((d) => d !== domain))
  }

  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-lg border bg-background transition-colors min-h-[46px] focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary ${
          error || inputError ? 'border-destructive' : 'border-border'
        }`}
      >
        {domains.map((domain) => (
          <span
            key={domain}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-sm font-mono"
          >
            {domain}
            <button
              type="button"
              onClick={() => removeDomain(domain)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (inputValue.trim()) addDomains(inputValue)
          }}
          placeholder={domains.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[140px] bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/50"
        />
      </div>
      {(error || inputError) && (
        <p className="text-destructive text-xs mt-1">{error || inputError}</p>
      )}
      <p className="text-muted-foreground text-xs mt-1">
        Press Enter or comma to add. Paste multiple domains at once.
      </p>
    </div>
  )
}
