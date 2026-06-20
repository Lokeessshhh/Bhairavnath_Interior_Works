import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import ExecutionStandards from '../components/ExecutionStandards';
import DesignJournal from '../components/DesignJournal';
import Interactive3DLayout from '../components/Interactive3DLayout';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      
      <div className="reveal-on-scroll">
        <Services />
      </div>

      <div className="reveal-on-scroll">
        <ExecutionStandards />
      </div>

      <div className="reveal-on-scroll">
        <DesignJournal />
      </div>

      {/* Interactive 3D Exploded Layout Section */}
      <Interactive3DLayout />

      <div className="reveal-on-scroll">
        <Process />
      </div>

      <div className="reveal-on-scroll">
        <Testimonials />
      </div>

      <div className="reveal-on-scroll">
        <Contact />
      </div>
    </>
  );
}
