'use client';
import dynamic from 'next/dynamic';

const StarCanvas = dynamic(() => import('./StarCanvas'), { ssr: false });

export default function ClientStarCanvas() {
  return <StarCanvas />;
}
