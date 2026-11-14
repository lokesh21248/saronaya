'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Award,
  Download,
  CheckCircle2,
  ShieldCheck,
  Printer,
  ExternalLink,
  Play,
  Share2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'
import { SAMPLE_CERTIFICATES } from '@/lib/data/lms-data'

export default function CertificatesPage() {
  const [activeCert, setActiveCert] = useState(SAMPLE_CERTIFICATES[0])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#dfa32b]/30">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 space-y-5">
        {/* Title banner */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-2">
                <ShieldCheck size={14} />
                <span>Cryptographically Verified</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102b46]">
                Academic Certificates
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-1">
                Official certificates awarded upon passing verified engineering assessments.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {/* Certificate Selector List */}
          <div className="space-y-3 print:hidden">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a7184]">
              Earned Certificates ({SAMPLE_CERTIFICATES.length})
            </h2>

            {SAMPLE_CERTIFICATES.map((cert) => {
              const isSelected = cert.id === activeCert.id
              return (
                <div
                  key={cert.id}
                  onClick={() => setActiveCert(cert)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/70 border-[#e5a93b] shadow-md ring-1 ring-[#e5a93b]/40'
                      : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-100/70 text-[#c58a23] shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-[#102b46]">
                        {cert.courseTitle}
                      </h3>
                      <p className="text-[11px] text-[#5a7184] mt-0.5">
                        Issued: {cert.issuedDate}
                      </p>
                      <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                        {cert.grade}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Certificate Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white text-[#102b46] p-8 sm:p-12 rounded-[28px] shadow-[0_8px_30px_rgba(16,43,70,0.08)] border-4 border-[#e5a93b]/80 relative overflow-hidden print:p-0 print:border-none print:shadow-none">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#e5a93b] pointer-events-none" />
              <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#e5a93b] pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#e5a93b] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#e5a93b] pointer-events-none" />

              <div className="text-center space-y-6 relative z-10">
                {/* Official Logo */}
                <div className="flex justify-center">
                  <SaryonayaLogo size="lg" />
                </div>

                <div className="uppercase tracking-[0.25em] text-[11px] font-black text-[#c58a23]">
                  Certificate of Academic Excellence
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#5a7184] uppercase tracking-wider">
                    This certifies that
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#102b46] font-serif italic py-1">
                    {activeCert.studentName}
                  </h2>
                  <p className="text-xs text-[#5a7184] max-w-md mx-auto">
                    has successfully completed the comprehensive curriculum and passed all technical assessments for
                  </p>
                </div>

                <div className="py-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#102b46] tracking-tight">
                    {activeCert.courseTitle}
                  </h3>
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold">
                    <span>Performance Grade: {activeCert.grade}</span>
                  </div>
                </div>

                {/* Signatures & Verification Row */}
                <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-6 items-end">
                  <div className="text-left space-y-1">
                    <div className="font-serif italic text-base text-[#102b46]">
                      Dr. A. R. Sharma
                    </div>
                    <div className="h-0.5 w-32 bg-[#102b46]/20" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">
                      Dean of Engineering & Academics
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-[10px] text-slate-400 font-mono">
                      ID: {activeCert.id.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold flex items-center justify-end gap-1">
                      <ShieldCheck size={12} /> Cryptographically Verified
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Issued: {activeCert.issuedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
        <BottomNav />
      </div>
    </div>
  )
}
