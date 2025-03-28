export function SectionHeader({ text }: { text: string }) {
    return <h2 className="text-2xl font-semibold">{text}</h2>;
  }
  
export function Section({ children }: { children: React.ReactNode }) {
return <section className="flex flex-col gap-4 items-start w-full">{children}</section>;
}
