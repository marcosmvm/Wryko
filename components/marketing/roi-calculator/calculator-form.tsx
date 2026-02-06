'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalculatorInputs, IndustryKey, industryOptions } from './industry-data'
import { Users, CurrencyDollar, Calendar, Buildings } from '@phosphor-icons/react'

interface CalculatorFormProps {
  inputs: CalculatorInputs
  onChange: (inputs: CalculatorInputs) => void
}

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const handleChange = (field: keyof CalculatorInputs, value: string | number) => {
    onChange({
      ...inputs,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-heading font-semibold text-foreground">
        Your Current Situation
      </h3>

      <div className="space-y-4">
        {/* Sales Reps */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="w-4 h-4 text-primary" weight="duotone" />
            Number of Sales Reps
          </label>
          <Input
            type="number"
            min={1}
            max={100}
            value={inputs.salesReps}
            onChange={(e) => handleChange('salesReps', parseInt(e.target.value) || 1)}
            className="bg-background/50"
          />
        </div>

        {/* Average Deal Size */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CurrencyDollar className="w-4 h-4 text-primary" weight="duotone" />
            Average Deal Size
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              type="number"
              min={1000}
              max={10000000}
              step={1000}
              value={inputs.averageDealSize}
              onChange={(e) =>
                handleChange('averageDealSize', parseInt(e.target.value) || 25000)
              }
              className="pl-7 bg-background/50"
            />
          </div>
        </div>

        {/* Current Meetings */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="w-4 h-4 text-primary" weight="duotone" />
            Current Meetings per Month
          </label>
          <Input
            type="number"
            min={0}
            max={100}
            value={inputs.currentMeetings}
            onChange={(e) =>
              handleChange('currentMeetings', parseInt(e.target.value) || 0)
            }
            className="bg-background/50"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Buildings className="w-4 h-4 text-primary" weight="duotone" />
            Industry
          </label>
          <Select
            value={inputs.industry}
            onValueChange={(value) => handleChange('industry', value as IndustryKey)}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
