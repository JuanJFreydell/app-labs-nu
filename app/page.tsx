"use client";
import { useState, useEffect } from "react";

export default function Hackathon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-08-06T15:30:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 pt-14">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl mb-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              AGENTIC HACKATHON
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 mb-2 font-light">
              The Future of AI is Here
            </p>
            <p className="text-lg text-slate-300">August 6th, 2025 • 3:30 PM</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12">
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-6xl font-bold text-cyan-300">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-lg text-slate-300 font-light">
                Days
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-6xl font-bold text-blue-300">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-lg text-slate-300 font-light">
                Hours
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-6xl font-bold text-indigo-300">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-lg text-slate-300 font-light">
                Minutes
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl md:text-6xl font-bold text-sky-300">
                {timeLeft.seconds}
              </div>
              <div className="text-sm md:text-lg text-slate-300 font-light">
                Seconds
              </div>
            </div>
          </div>
        </div>

        {/* Hype Content */}
        <div className="text-center mb-12 max-w-4xl">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-200">
              🚀 Build the Next Generation of AI Agents 🚀
            </h2>
            <p className="text-lg md:text-xl text-slate-200 mb-6 leading-relaxed font-light">
              Join Northeastern&apos;s brightest minds in a revolutionary
              hackathon where you&apos;ll create autonomous AI agents that can
              think, learn, and act independently.
              <span className="text-cyan-300 font-semibold">
                {" "}
                The future of AI starts with you.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-200">
                AI Agents
              </h3>
              <p className="text-slate-300 font-light">
                Build autonomous systems that can reason and act
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                🏆
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-200">Prizes</h3>
              <p className="text-slate-300 font-light">
                Win amazing rewards and recognition
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                🌟
              </div>
              <h3 className="text-xl font-bold mb-2 text-indigo-200">
                Innovation
              </h3>
              <p className="text-slate-300 font-light">
                Shape the future of artificial intelligence
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <button className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-400/90 hover:to-blue-400/90 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-cyan-400/30">
            🚀 Create Account
          </button>
          <button className="backdrop-blur-xl bg-gradient-to-r from-slate-600/50 to-slate-700/50 hover:from-slate-500/60 hover:to-slate-600/60 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20">
            🔑 Log In
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400">
          <p className="text-sm font-light">
            Powered by NU App Lab • Northeastern University
          </p>
        </div>
      </div>
    </div>
  );
}
