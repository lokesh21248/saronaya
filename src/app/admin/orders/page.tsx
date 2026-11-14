'use client'

import React, { useState } from 'react'
import { CreditCard, Search, Download, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')

  const orders = [
    { id: 'pay_Nq99a8sd1', orderId: 'ord_91823', student: 'K. Rajesh (CSE)', email: 'rajesh@college.edu', course: 'Python for Beginners', amount: '₹999', method: 'UPI', status: 'Captured', date: 'Nov 14, 2026 06:15' },
    { id: 'pay_Nq99a8sd2', orderId: 'ord_91822', student: 'Ananya S. (AI&ML)', email: 'ananya@iitm.ac.in', course: 'Applied Machine Learning', amount: '₹1,499', method: 'Credit Card', status: 'Captured', date: 'Nov 14, 2026 05:42' },
    { id: 'pay_Nq99a8sd3', orderId: 'ord_91821', student: 'P. Vignesh (ECE)', email: 'vignesh@jntu.edu', course: 'Embedded Systems & VLSI', amount: '₹1,199', method: 'Net Banking', status: 'Captured', date: 'Nov 14, 2026 04:30' },
    { id: 'pay_Nq99a8sd4', orderId: 'ord_91820', student: 'Deepak V. (CSE)', email: 'deepak@college.edu', course: 'Monthly Pro Plan', amount: '₹499', method: 'UPI', status: 'Captured', date: 'Nov 13, 2026 21:18' },
    { id: 'pay_Nq99a8sd5', orderId: 'ord_91819', student: 'Meera N. (MECH)', email: 'meera@bits.ac.in', course: 'SolidWorks 3D CAD', amount: '₹999', method: 'UPI', status: 'Captured', date: 'Nov 13, 2026 18:04' },
  ]

  const filtered = orders.filter(
    (o) =>
      o.student.toLowerCase().includes(search.toLowerCase()) ||
      o.course.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Razorpay Orders & Transactions</h1>
          <p className="text-muted text-sm mt-1">
            Audit logs of all student checkout sessions, webhook validations, and active course enrollments.
          </p>
        </div>

        <Button variant="outline" size="sm" className="border-line/30 flex items-center gap-1.5">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <div className="bg-navy border border-line/20 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-3 text-muted" />
          <input
            type="text"
            placeholder="Search by student, course, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-navy-soft/60 border border-line/15 rounded-lg text-cream placeholder-muted text-xs focus:border-gold outline-none"
          />
        </div>
        <span className="text-xs text-muted shrink-0">
          Showing {filtered.length} transactions
        </span>
      </div>

      <div className="bg-navy border border-line/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line/10 text-muted uppercase tracking-wider bg-navy-soft/40">
                <th className="p-4 font-semibold">Payment ID</th>
                <th className="p-4 font-semibold">Student</th>
                <th className="p-4 font-semibold">Enrolled Item</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Method</th>
                <th className="p-4 font-semibold">Webhook Status</th>
                <th className="p-4 font-semibold">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-navy-soft/20 transition-colors">
                  <td className="p-4 font-mono text-muted">{ord.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-white block">{ord.student}</span>
                    <span className="text-muted text-[11px]">{ord.email}</span>
                  </td>
                  <td className="p-4 font-medium text-cream">{ord.course}</td>
                  <td className="p-4 font-bold text-gold">{ord.amount}</td>
                  <td className="p-4 text-cream/80">{ord.method}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                      <CheckCircle2 size={12} /> {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted">{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
