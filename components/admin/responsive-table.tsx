'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  className?: string
  headerClassName?: string
  render: (item: T) => React.ReactNode
  mobileRender?: (item: T) => React.ReactNode
  mobileLabel?: string
  hideOnMobile?: boolean
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string
  onRowClick?: (item: T) => void
  sortField?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (field: string) => void
  emptyState?: React.ReactNode
  className?: string
}

export function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  sortField,
  sortDirection,
  onSort,
  emptyState,
  className,
}: ResponsiveTableProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hideOnMobile)

  const SortIndicator = ({ field }: { field: string }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    )
  }

  if (data.length === 0) {
    return emptyState || (
      <div className="p-8 text-center text-muted-foreground">
        No data available.
      </div>
    )
  }

  return (
    <div className={cn('bg-card border border-border rounded-xl overflow-hidden', className)}>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'text-left px-4 py-3 text-sm font-medium text-muted-foreground',
                    column.sortable && 'cursor-pointer hover:text-foreground select-none',
                    column.headerClassName
                  )}
                  onClick={() => column.sortable && onSort?.(column.key)}
                  role={column.sortable ? 'button' : undefined}
                  aria-sort={
                    column.sortable && sortField === column.key
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                  tabIndex={column.sortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      onSort?.(column.key)
                    }
                  }}
                >
                  {column.header}
                  {column.sortable && <SortIndicator field={column.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className={cn(
                  'border-b border-border last:border-0 hover:bg-muted/30 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(item)}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onRowClick(item)
                  }
                }}
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn('px-4 py-4', column.className)}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {data.map((item) => (
          <div
            key={keyExtractor(item)}
            className={cn(
              'p-4 hover:bg-muted/30 transition-colors',
              onRowClick && 'cursor-pointer'
            )}
            onClick={() => onRowClick?.(item)}
            tabIndex={onRowClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onRowClick(item)
              }
            }}
          >
            {visibleColumns.map((column, index) => (
              <div
                key={column.key}
                className={cn(
                  'flex items-center justify-between',
                  index > 0 && 'mt-2 pt-2 border-t border-border/50'
                )}
              >
                {column.mobileLabel !== '' && (
                  <span className="text-xs text-muted-foreground">
                    {column.mobileLabel || column.header}
                  </span>
                )}
                <div className={column.mobileLabel === '' ? 'w-full' : ''}>
                  {column.mobileRender ? column.mobileRender(item) : column.render(item)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Preset for simple tables without complex configuration
interface SimpleTableProps<T> {
  data: T[]
  columns: {
    key: string
    header: string
    render: (item: T) => React.ReactNode
  }[]
  keyExtractor: (item: T) => string
  className?: string
}

export function SimpleTable<T>({
  data,
  columns,
  keyExtractor,
  className,
}: SimpleTableProps<T>) {
  return (
    <ResponsiveTable
      data={data}
      columns={columns}
      keyExtractor={keyExtractor}
      className={className}
    />
  )
}
