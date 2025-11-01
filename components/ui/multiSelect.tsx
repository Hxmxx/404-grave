'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface MultiSelectProps {
    options: readonly string[] | string[]
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    value,
    onChange,
    placeholder = '선택...',
    className,
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase()),
    )

    const toggleOption = (option: string) => {
        if (value.includes(option)) {
            onChange(value.filter(v => v !== option))
        } else {
            onChange([...value, option])
        }
    }

    const removeOption = (option: string) => {
        onChange(value.filter(v => v !== option))
    }

    return (
        <div ref={wrapperRef} className={cn('relative', className)}>
            {/* Selected items */}
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map(item => (
                    <span
                        key={item}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md"
                    >
                        {item}
                        <button
                            type="button"
                            onClick={() => removeOption(item)}
                            className="hover:text-gray-600"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>

            {/* Search input */}
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder={placeholder}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">결과 없음</div>
                    ) : (
                        filteredOptions.map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleOption(option)}
                                className={cn(
                                    'w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between',
                                    value.includes(option) && 'bg-gray-100',
                                )}
                            >
                                {option}
                                {value.includes(option) && <span className="text-gray-900">✓</span>}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
