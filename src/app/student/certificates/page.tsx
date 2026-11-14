'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Award, Download, CheckCircle2, ShieldCheck, Printer, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { SAMPLE_CERTIFICATES } from '@/lib/data/lms-data'

export default function CertificatesPage() {
  const [activeCert, setActiveCert] = useState(SAMPLE_CERTIFICATES[0])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold mb-3">
              <ShieldCheck size={14} />
              <span>Cryptographically Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Academic Certificates</h1>
            <p className="text-muted text-sm mt-1 max-w-xl">
              Official certificates awarded upon completion of engineering courses and passing verified assessments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePrint} className="border-line/30 flex items-center gap-2">
              <Printer size={16} /> Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Certificate Display and Selection */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certificate Selector List */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Earned Certificates ({SAMPLE_CERTIFICATES.length})
            </h2>

            {SAMPLE_CERTIFICATES.map((cert) => {
              const isSelected = cert.id === activeCert.id
              return (
                <div
                  key={cert.id}
                  onClick={() => setActiveCert(cert)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-navy-soft border-gold shadow-lg ring-1 ring-gold/40'
                      : 'bg-navy border-line/15 hover:border-gold/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gold/15 text-gold shrink-0 mt-0.5">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{cert.courseTitle}</h3>
                      <p className="text-xs text-muted mt-1">Issued: {cert.issuedDate}</p>
                      <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                        {cert.grade}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Certificate Canvas / Certificate Certificate Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white text-navy-deep p-8 sm:p-12 rounded-2xl shadow-2xl border-4 border-gold relative overflow-hidden print:p-0 print:border-none">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-gold pointer-events-none" />
              <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-gold pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-gold pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-gold pointer-events-none" />

              <div className="text-center space-y-6 relative z-10">
                {/* Certificate Brand */}
                <div className="inline-flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#102b46] flex items-center justify-center text-gold font-black text-xl">
                    S
                  </div>
                  <span className="text-2xl font-black tracking-widest text-[#102b46]">
                    SARYONAYA
                  </span>
                </div>

                <div className="uppercase tracking-[0.25em] text-xs font-bold text-muted">
                  Certificate of Academic Excellence
                </div>

                <p className="text-sm text-muted">This is proudly presented to</p>

                <div className="text-3xl sm:text-4xl font-black text-[#102b46] tracking-tight font-serif italic border-b-2 border-gold/40 pb-3 max-w-md mx-auto">
                  {activeCert.studentName}
                </div>

                <p className="text-sm text-muted max-w-lg mx-auto">
                  for successfully mastering the curriculum and passing all technical evaluations for the course
                </p>

                <div className="text-xl sm:text-2xl font-bold text-[#102b46]">
                  {activeCert.courseTitle}
                </div>

                <div className="inline-block bg-[#102b46]/5 px-4 py-1.5 rounded-full text-xs font-semibold text-[#102b46]">
                  {activeCert.grade}
                </div>

                {/* Footer Signatures and Verification Seal */}
                <div className="pt-8 grid grid-cols-3 items-end gap-4 border-t border-line/50 text-center">
                  <div>
                    <div className="font-serif italic text-sm text-[#102b46] font-semibold">
                      Dr. Ramesh Sharma
                    </div>
                    <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
                      Lead Instructor
                    </p>
                  </div>

                  {/* Golden Seal */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#b8862f] via-[#d9ad61] to-[#f2d89e] flex items-center justify-center shadow-lg border-2 border-white">
                      <div className="w-13 h-13 rounded-full border border-navy/30 flex items-center justify-center text-center p-1">
                        <Award size={24} className="text-[#102b46]" />
                      </div>
                    </div>
                    <span className="text-[9px] text-muted mt-1 uppercase font-bold tracking-widest">
                      Verified Seal
                    </span>
                  </div>

                  <div>
                    <div className="font-serif italic text-sm text-[#102b46] font-semibold">
                      Saryonaya Council
                    </div>
                    <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
                      Academic Director
                    </p>
                  </div>
                </div>

                <div className="pt-4 text-[10px] text-muted flex items-center justify-between border-t border-line/30">
                  <span>Certificate ID: {activeCert.certificateNumber}</span>
                  <span>Issued on: {activeCert.issuedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

