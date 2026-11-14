'use client'

import React, { useState } from 'react'
import { Layers, Plus, CheckCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ACADEMIC_BRANCHES, AcademicBranchData, COURSES_DATA } from '@/lib/data/lms-data'

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<AcademicBranchData[]>(ACADEMIC_BRANCHES)
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCode || !newName) return

    setBranches([
      ...branches,
      {
        id: `branch-${newCode.toLowerCase()}`,
        code: newCode.toUpperCase(),
        name: newName,
        description: `${newName} engineering discipline and syllabus.`,
        icon: '🎓',
        color: '#d9ad61',
      },
    ])
    setNewCode('')
    setNewName('')
    setShowAdd(false)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Academic Branch Mapping</h1>
          <p className="text-muted text-sm mt-1">
            Configure master engineering branches to control course visibility and student profile onboarding.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setShowAdd(!showAdd)}
          className="font-bold text-navy-deep flex items-center gap-2"
        >
          <Plus size={16} /> Add Engineering Branch
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-navy border border-gold/40 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white">New Academic Branch</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Branch Code (e.g. CHEM, BIO)</label>
              <input
                type="text"
                required
                placeholder="CHEM"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-3 py-2 bg-navy-soft border border-line/20 rounded-lg text-cream text-xs outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Full Branch Name</label>
              <input
                type="text"
                required
                placeholder="Chemical Engineering"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-navy-soft border border-line/20 rounded-lg text-cream text-xs outline-none focus:border-gold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button variant="gold" size="sm" type="submit" className="text-navy-deep font-bold">Save Branch</Button>
          </div>
        </form>
      )}

      {/* Branches List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {branches.map((b) => {
          const coursesCount = COURSES_DATA.filter((c) =>
            c.eligibleBranches.includes(b.code)
          ).length

          return (
            <div
              key={b.code}
              className="bg-navy border border-line/20 rounded-2xl p-6 shadow-xl space-y-4 hover:border-gold/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold/15 text-gold border border-gold/30">
                    {b.code}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">{b.name}</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">{b.description}</p>
              </div>

              <div className="pt-4 border-t border-line/10 flex items-center justify-between text-xs text-muted">
                <span>Active Courses</span>
                <span className="font-bold text-cream">{coursesCount} courses mapped</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
