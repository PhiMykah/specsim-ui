import { Section, SectionHeader } from "@/components/Section";

export function ParamWrapper({ children, headerText }: { children: React.ReactNode; headerText: string; }) {
    return (
        <Section>
            <SectionHeader text={headerText} />
            <div
                className={`grid gap-4 w-full`}
            >
                {children}
            </div>
        </Section>
    );
}

export function Parameter({ text, command, className }: { text: string; command: string; className?: string }) {
    return (
        <div className={className ?? "flex gap-2 items-center"}>
            {text}
            <code className="bg-accent text-accent-content rounded-lg p-1 text-sm">
                {command}
            </code>
        </div>
    );
}