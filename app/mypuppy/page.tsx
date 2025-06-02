"use client";
import { dogs } from "@/data/dogs";
import Image from "next/image";

const checklist = [
  { label: "ให้ข้าววันละ 2 มื้อ", type: "ประจำวัน", img: "/checklist/meal.png" },
  { label: "พาไปเดินเล่น", type: "ประจำวัน", img: "/checklist/running.png" },
  { label: "อากาศถ่ายเท", type: "ความปลอดภัย", img: "/checklist/window.png" },
  { label: "พูดคุยกับน้อง", type: "ประจำวัน", img: "/checklist/speaking.png" },
  { label: "โอบกอดลูบขน", type: "ประจำวัน", img: "/checklist/hug.png" },
  { label: "ปลอดสายไฟเปลือย", type: "ความปลอดภัย", img: "/checklist/plug.png" },
];

import React, { useState } from "react";
import Link from "next/link";

export default function MyPuppyPage() {
  const dog = dogs[0];
  const [done, setDone] = useState<boolean[]>(Array(checklist.length).fill(false));
  const doneCount = done.filter(Boolean).length;

  const toggleDone = (idx: number) => {
    setDone((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <main style={{ fontFamily: 'Kanit, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
  style={{
    position: 'relative',
    width: '100%',
    aspectRatio: '16/6',
    minHeight: 220,
    maxHeight: 340,
    overflow: 'hidden',
    background: '#eee',
  }}
>
  <Image
    src={dog.image}
    alt={dog.name}
    fill
    sizes="100vw"
    priority
    style={{ objectFit: 'cover', filter: 'brightness(0.8)' }}
    // placeholder="blur"
    // blurDataURL={dog.blurDataURL}
  />
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, #0000 60%, #0005 100%)',
      pointerEvents: 'none',
    }}
  />
</div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem 0 1rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: '2.5rem', marginBottom: 0 }}>{dog.name}</h1>
        <div style={{ margin: '0.5rem 0 1.5rem 0', color: '#555', fontWeight: 400 }}>
          {dog.breed} · อายุ {dog.age} · ราคา {dog.pricePerDay.toLocaleString()} บาท/วัน
        </div>
        <div style={{ color: '#222', fontSize: '1.1rem', marginBottom: '2rem' }}>{dog.description}</div>
        <div style={{ marginBottom: '2.5rem' }}>
          <Link href="/return" passHref>
            <button 
              style={{
                background: '#3b7043',
                color: 'white',
                border: 0,
                borderRadius: 8,
                padding: '0.6rem 1.5rem',
                fontWeight: 500,
                fontSize: 17,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#2f5a36')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#3b7043')}
            >
                ส่งคืนสัตว์เลี้ยง
            </button>
          </Link>
          <Link href="/">
              <button className="bg-[#05A75B] text-white hover:bg-green-500 px-2 py-3 ml-4 rounded-md">
                กลับหน้าแรก
              </button>
          </Link>
        </div>

        {/* Relationship Checklist */}
        <h2 style={{ fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.5rem' }}>เช็คลิสต์สานสัมพันธ์</h2>
        <div style={{ marginBottom: 14 }}>
          <span style={{ background: '#eafbe5', color: '#3b7043', borderRadius: 8, padding: '0.25rem 1rem', fontSize: 15, fontWeight: 500 }}>
            ทำแล้ว {doneCount}/{checklist.length}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button style={{ background: '#ffe6a7', color: '#7a5d1a', border: 0, borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 500, fontSize: 16 }}>ประจำวัน</button>
          <button style={{ background: '#eafbe5', color: '#3b7043', border: 0, borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 500, fontSize: 16 }}>ความปลอดภัย</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
          {checklist.map((item, i) => (
            <div
              key={i}
              onClick={() => toggleDone(i)}
              style={{
                position: 'relative',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 2px 8px #0001',
                minHeight: 220,
                cursor: 'pointer',
                opacity: done[i] ? 0.65 : 1,
                border: done[i] ? '2.5px solid #3b7043' : 'none',
                transition: 'opacity 0.2s, border 0.2s',
              }}
            >
              <Image src={item.img} alt={item.label} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0000 40%, #0009 100%)' }} />
              <span style={{ position: 'absolute', top: 12, left: 12, background: item.type === 'ประจำวัน' ? '#ffe6a7' : '#eafbe5', color: item.type === 'ประจำวัน' ? '#7a5d1a' : '#3b7043', fontWeight: 500, borderRadius: 6, padding: '0.18rem 0.7rem', fontSize: 14 }}>{item.type}</span>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18, color: '#fff', fontWeight: 500, fontSize: 17, textAlign: 'center', textShadow: '0 2px 12px #0007' }}>{item.label}</div>
              {done[i] && (
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: '#fff',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px #0002',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#3b7043" />
                    <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

