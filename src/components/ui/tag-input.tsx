import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TagInputProps {
  values: string[]
  onChange: (vals: string[]) => void
  placeholder?: string
  className?: string
  pillColorClass?: string
}

export function TagInput({
  values,
  onChange,
  placeholder,
  className,
  pillColorClass = 'bg-blue-100 text-blue-700',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  function commit(raw: string) {
    const trimmed = raw.trim()
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed])
    }
    setInputValue('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === ',' || e.key === ';' || e.key === 'Enter') {
      e.preventDefault()
      commit(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '' && values.length > 0) {
      onChange(values.slice(0, -1))
    }
  }

  function removeTag(idx: number) {
    onChange(values.filter((_, i) => i !== idx))
  }

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5 min-h-[38px] w-full rounded-md border border-input bg-white px-3 py-1.5 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0',
        className
      )}
    >
      {values.map((v, i) => (
        <span
          key={i}
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
            pillColorClass
          )}
        >
          {v}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="hover:opacity-70 transition-opacity"
            aria-label={`Remover ${v}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => commit(inputValue)}
        placeholder={values.length === 0 ? placeholder : undefined}
        className="flex-1 min-w-[120px] outline-none bg-transparent text-sm placeholder:text-muted-foreground"
      />
    </div>
  )
}
