export function SectionHeader({ text }: { text: string }) {
    return <h2 className="text-2xl font-semibold">{text}</h2>;
  }
  
export function Section({ children }: { children: React.ReactNode }) {
return <section className="flex flex-col gap-4 items-start w-full">{children}</section>;
}

export function SettingsPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-200 relative min-h-screen">
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-10 gap-4 sm:p-10 font-[family-name:var(--font-inter)]">
            <header className="text-4xl font-bold row-start-1 text-center">
                Spectral Simulation
            </header>
            <div className="flex flex-col gap-4 row-start-2 sm:items-start w-full">
                <div className="divider"></div>
                {children}
            </div>
        </div>
    </div>
  )
}