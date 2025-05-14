'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function CalculatorPage() {
  const [amount, setAmount] = useState(25000);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(6.5);

  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term;
  const monthlyPayment =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - amount;

  const chartData = Array.from({ length: numberOfPayments }, (_, i) => ({
    month: i + 1,
    balance: Math.max(0, amount - ((amount / numberOfPayments) * i)),
  }));

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* Logo aligned top-right */}
      <div className="flex justify-end w-full pr-6 pt-6">
        <img src="/logo.png" alt="Caprock Logo" className="h-24 sm:h-24" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 w-full space-y-10">
        <section className="bg-black/30 rounded-lg p-8 text-center text-base leading-relaxed space-y-6 w-full max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Auto Loan Payment Calculator
          </h2>

          <div className="bg-white text-black shadow-md rounded-lg p-6 space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-medium mb-1">Loan Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                  className="w-full border p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Loan Term (Months)</label>
                <input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(+e.target.value)}
                  className="w-full border p-3 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(+e.target.value)}
                  className="w-full border p-3 rounded-md"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md space-y-2 text-base">
              <p><strong>Estimated Monthly Payment:</strong> ${monthlyPayment.toFixed(2)}</p>
              <p><strong>Total Repaid:</strong> ${totalPayment.toFixed(2)}</p>
              <p><strong>Total Interest Paid:</strong> ${totalInterest.toFixed(2)}</p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
