'use client'

import React from 'react'
import Link from 'next/link'
import {
  Users,
  CreditCard,
  BookOpen,
  Video,
  ArrowUpRight,
  TrendingUp,
  PlusCircle,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { COURSES_DATA, ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Enrolled Students', value: '1,428', icon: Users, change: '+18% this month', color: 'text-blue-400' },
    { label: 'Total Revenue (INR)', value: '₹3,42,850', icon: CreditCard, change: '+24% this month', color: 'text-gold' },
    { label: 'Published Courses', value: COURSES_DATA.length.toString(), icon: BookOpen, change: 'Across 7 Branches', color: 'text-emerald-400' },
    { label: 'Mux Video Delivery', value: '42,150 / 100k min', icon: Video, change: 'Healthy (42% used)', color: 'text-amber-400' },
  ]

  const recentOrders = [
    { id: 'ord_91823', student: 'K. Rajesh (CSE)', course: 'Python for Beginners', amount: '₹999', status: 'Completed', date: 'Just now' },
    { id: 'ord_91822', student: 'Ananya S. (AI&ML)', course: 'Applied Machine Learning', amount: '₹1,499', status: 'Completed', date: '12 mins ago' },
    { id: 'ord_91821', student: 'P. Vignesh (ECE)', course: 'Embedded Systems & VLSI', amount: '₹1,199', status: 'Completed', date: '45 mins ago' },
    { id: 'ord_91820', student: 'Deepak V. (CSE)', course: 'Monthly Pro Subscription', amount: '₹499', status: 'Completed', date: '2 hours ago' },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Analytics</h1>
          <p className="text-muted text-sm mt-1">
            Real-time overview of course enrollments, branch mappings, Mux video delivery, and Razorpay revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/courses/new">
            <Button variant="gold" size="sm" className="font-bold text-navy-deep flex items-center gap-2">
              <PlusCircle size={16} /> Create Course
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon
          return (
            <div
              key={idx}
              className="bg-navy border border-line/20 rounded-2xl p-5 hover:border-gold/30 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">
                  {s.label}
                </span>
                <div className={`p-2.5 rounded-xl bg-navy-soft ${s.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-3">
                {s.value}
              </div>
              <p className="text-xs text-muted mt-1.5 flex items-center gap-1 font-medium">
                <TrendingUp size={12} className="text-emerald-400" /> {s.change}
              </p>
            </div>
          )
        })}
      </div>

      {/* Main Grid: Branch Distribution & Recent Transactions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Branch Distribution */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Branch Breakdown</h2>
            <Link href="/admin/branches" className="text-xs text-gold hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-3.5">
            {ACADEMIC_BRANCHES.map((b) => {
              const courseCount = COURSES_DATA.filter((c) =>
                c.eligibleBranches.includes(b.code)
              ).length

              return (
                <div key={b.code} className="p-3 bg-navy-soft/40 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{b.icon}</span>
                    <div>
                      <span className="text-sm font-bold text-white block">{b.code}</span>
                      <span className="text-[11px] text-muted line-clamp-1">{b.name}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                    {courseCount} Courses
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-navy border border-line/20 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Razorpay Orders</h2>
              <p className="text-xs text-muted">Real-time payment capture & auto-enrollment</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-gold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line/10 text-muted uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Student</th>
                  <th className="pb-3 font-semibold">Course / Plan</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/10">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-navy-soft/30 transition-colors">
                    <td className="py-3 font-mono text-muted">{ord.id}</td>
                    <td className="py-3 font-medium text-white">{ord.student}</td>
                    <td className="py-3 text-cream">{ord.course}</td>
                    <td className="py-3 font-bold text-gold">{ord.amount}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
