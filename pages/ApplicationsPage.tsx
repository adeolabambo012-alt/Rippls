import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppState } from '../App';
import { TaskStatus } from '../types';

const ApplicationsPage: React.FC = () => {
  const { tasks, reviewApplication, verifySubmission, rejectSubmission } = useAppState();
  const [activeTab, setActiveTab] = useState<'pending' | 'review'>('pending');
  
  // Logic: Split queue into New Applicants vs Work to Review
  const newApplicants = tasks.filter(t => t.status === TaskStatus.PENDING);
  const workInReview = tasks.filter(t => t.status === TaskStatus.IN_REVIEW);

  const displayQueue = activeTab === 'pending' ? newApplicants : workInReview;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-5xl font-black tracking-tight leading-none text-slate-900 dark:text-white">Impact <span className="text-blue-500 italic">Vetting.</span></h1>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">Partner Pipeline</span>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-xl">
            Review professional pitches or audit evidence from completed missions.
          </p>
        </div>

        <div className="flex bg-white dark:bg-card-dark p-2 rounded-3xl border border-border-light dark:border-border-dark shadow-sm shrink-0">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-slate-900 text-white dark:bg-primary dark:text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Pitches ({newApplicants.length})
          </button>
          <button 
            onClick={() => setActiveTab('review')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'review' ? 'bg-slate-900 text-white dark:bg-primary dark:text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Evidence ({workInReview.length})
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {displayQueue.length > 0 ? displayQueue.map((task, i) => (
              <motion.div 
                key={task.id} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-card-dark rounded-[3.5rem] border border-border-light dark:border-border-dark p-8 md:p-12 shadow-sm space-y-10 group transition-all hover:border-blue-500/40"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="relative shrink-0">
                      <img src={`https://picsum.photos/seed/${task.id+20}/120/120`} className="size-24 rounded-[2rem] border-4 border-slate-50 dark:border-slate-900 shadow-xl object-cover" alt="V" />
                      <div className="absolute -bottom-2 -right-2 size-8 bg-primary text-slate-900 rounded-full flex items-center justify-center font-black text-[10px] border-4 border-white dark:border-card-dark shadow-lg">L14</div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-2xl font-black truncate leading-none text-slate-900 dark:text-white">Volunteer Profile</h4>
                        <span className="material-symbols-outlined text-primary text-sm fill-1">verified</span>
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">rocket</span>
                        Mission: <span className="text-slate-900 dark:text-white truncate max-w-[200px]">{task.title}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {activeTab === 'pending' ? (
                      <>
                        <button onClick={() => reviewApplication(task.id, true)} className="h-14 px-8 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">Accept</button>
                        <button onClick={() => reviewApplication(task.id, false)} className="h-14 px-8 border-2 border-slate-100 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-red-500 hover:border-red-500 transition-all">Decline</button>
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button onClick={() => verifySubmission(task.id)} className="h-14 px-8 bg-primary text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">Verify & Reward</button>
                        <button onClick={() => rejectSubmission(task.id)} className="h-14 px-8 border-2 border-slate-100 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-red-500 hover:border-red-500 transition-all">Reject</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volunteer Statement</h5>
                      <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-border-light dark:border-border-dark italic font-medium text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {activeTab === 'pending' ? (
                          `"${task.applicationDetails?.pitch || 'Passionate professional ready to contribute to this specific mission goals.'}"`
                        ) : (
                          <div className="space-y-4 not-italic">
                             <p className="font-bold text-slate-900 dark:text-white">Impact Evidence:</p>
                             <p>{task.evidence?.summary || 'Deliverables successfully completed and verified by internal lead.'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeTab === 'pending' ? 'Attached Docs' : 'Evidence Link'}</h5>
                      <div className="space-y-3">
                        <div className="p-4 bg-white dark:bg-slate-900 border border-border-light dark:border-white/5 rounded-2xl flex items-center justify-between group/file cursor-pointer hover:border-blue-500 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500">description</span>
                            <span className="text-xs font-bold truncate max-w-[150px] text-slate-900 dark:text-white">
                              {activeTab === 'pending' ? (task.applicationDetails?.resumeName || 'Curriculum_Vitae.pdf') : 'Project_Deliverables.zip'}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-slate-300 group-hover/file:text-blue-500 transition-colors">download</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="py-40 bg-white dark:bg-card-dark rounded-[4rem] border-2 border-dashed border-border-light dark:border-border-dark flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="size-24 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                  <span className="material-symbols-outlined text-6xl">tray</span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">Console Idle</h4>
                  <p className="text-slate-400 font-medium max-w-sm mx-auto">No pending pitchess or audits in your current pipeline.</p>
                </div>
                <Link to="/post-task" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">Create Mission</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 size-40 bg-blue-500/20 blur-[80px]"></div>
              <h3 className="text-2xl font-black mb-10">Intelligence Pulse</h3>
              <div className="space-y-12">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-black text-primary">100%</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Audit Score</p>
                  </div>
                  <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">speed</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-black text-blue-400">0.8h</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Response Time</p>
                  </div>
                  <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-400 text-3xl">timer</span>
                  </div>
                </div>
              </div>
           </div>

           <div className="bg-white dark:bg-card-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm space-y-6">
              <h4 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
                 <span className="material-symbols-outlined text-primary">lightbulb</span>
                 Impact Tip
              </h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic border-l-4 border-slate-100 dark:border-white/5 pl-6">
                "AI Vetting scores help prioritize elite talent. Focus on 90%+ matches for complex technical missions."
              </p>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default ApplicationsPage;
