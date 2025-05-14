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
  <div className="bg-[#fef3c7] min-h-screen py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <Image
        src="/logo.png"
        alt="Caprock Capital Group Logo"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />

        <h1 className="text-3xl font-bold text-center mb-8">
          Auto Loan Payment Calculator
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6 text-left">
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
      </div>
    </div>
  );
}
