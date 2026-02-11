import { ReactiveBackground } from '@/app/components/particlesbackground'

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactiveBackground />
      <div className="relative z-10">
        {children}
      </div>
    </>
  )
}
