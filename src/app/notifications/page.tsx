'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  CheckCircle2,
  BookOpen,
  Award,
  CreditCard,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Trash2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'

interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  category: 'course' | 'subscription' | 'certificate' | 'payment'
  isRead: boolean
  link?: string
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'course' | 'subscription' | 'certificate' | 'payment'>('all')

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'New Lesson Uploaded!',
      message: 'Lesson 7: Neural Networks & PyTorch has been added to Data Science with Python.',
      time: '15 mins ago',
      category: 'course',
      isRead: false,
      link: '/courses/applied-machine-learning',
    },
    {
      id: 'notif-2',
      title: 'Certificate Ready for Download!',
      message: 'Congratulations! Your certificate for Python for Beginners has been verified and issued.',
      time: '2 hours ago',
      category: 'certificate',
      isRead: false,
      link: '/certificates',
    },
    {
      id: 'notif-3',
      title: 'Payment Receipt Verified',
      message: 'Your payment of ₹1,999 for Python for Beginners was successful. Order ID: rcpt_9821.',
      time: '1 day ago',
      category: 'payment',
      isRead: true,
      link: '/my-learning',
    },
    {
      id: 'notif-4',
      title: 'Subscription Reminder',
      message: 'Your SARYONAYA All-Access Annual Pass gives you unlimited access to all 500+ courses.',
      time: '3 days ago',
      category: 'subscription',
      isRead: true,
      link: '/subscriptions',
    },
    {
      id: 'notif-5',
      title: 'Weekend Live Mentor Doubt Clearing Session',
      message: 'Join Prof. Arun Kumar this Saturday at 6:00 PM IST for interactive Q&A.',
      time: '4 days ago',
      category: 'course',
      isRead: true,
      link: '/courses',
    },
  ])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  const filtered = notifications.filter(
    (n) => filter === 'all' || n.category === filter
  )

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'course':
        return <BookOpen className="w-5 h-5 text-blue-600" />
      case 'certificate':
        return <Award className="w-5 h-5 text-[#dfa32b]" />
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-600" />
      case 'subscription':
        return <Sparkles className="w-5 h-5 text-purple-600" />
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#07182e] flex flex-col font-sans antialiased selection:bg-[#dfa32b]/30">
      <Navbar />

      <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/40 text-[#b87e1a] text-xs font-black">
                <Bell size={13} />
                <span>ACTIVITY FEED</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#07182e] tracking-tight">
                Notifications {unreadCount > 0 && <span className="text-[#dfa32b]">({unreadCount} New)</span>}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Stay updated with lecture releases, test scores, certificate alerts, and payment receipts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                className="px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#07182e] border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check size={14} />
                <span>Mark All Read</span>
              </button>
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Clear All Notifications"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Notifications' },
              { id: 'course', label: 'Course Updates' },
              { id: 'certificate', label: 'Certificates' },
              { id: 'payment', label: 'Payments' },
              { id: 'subscription', label: 'Subscriptions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#07182e] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Bell size={24} />
                </div>
                <h3 className="text-base font-black text-[#07182e]">No notifications in this category</h3>
                <p className="text-xs text-slate-500">
                  You are all caught up! When you complete lessons or receive certificates, they will appear here.
                </p>
              </div>
            ) : (
              filtered.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                    notif.isRead
                      ? 'bg-white border-slate-200/80 hover:border-slate-300'
                      : 'bg-amber-50/40 border-[#dfa32b]/40 shadow-xs ring-1 ring-[#dfa32b]/30'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center shrink-0 mt-0.5">
                      {getCategoryIcon(notif.category)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#07182e]">
                          {notif.title}
                        </h4>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1 font-medium">
                        <Clock size={12} />
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  </div>

                  {notif.link && (
                    <Link
                      href={notif.link}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[#07182e] hover:bg-[#07182e] hover:text-[#dfa32b] transition-all shrink-0"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  )
}

